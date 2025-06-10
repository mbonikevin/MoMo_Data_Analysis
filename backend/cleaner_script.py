import xml.etree.ElementTree as ET
import re
from datetime import datetime
import json

# here we are parsing the xml file with SMS messages
tree = ET.parse("modified_sms_v2.xml")
root = tree.getroot()

# variables which will hold outputed cleaned and unprocessed messages
categorized_data = []
unprocessed_messages = []

# function to categorize the messages by checking simillar iddentifiers
def categorize_sms(body):
    body_lower = body.lower()

    if "you have received" in body_lower and "from" in body_lower:
        return "Incoming Money"
    elif re.search(r"payment of \d[\d,]* rwf to", body_lower):
        if "code" in body_lower or re.search(r'\b\d{4,}\b', body_lower):
            return "Payments to Code Holders"
        return "Transfers to Mobile Numbers"
    elif "bank deposit" in body_lower:
        return "Bank Deposits"
    elif "airtime" in body_lower:
        return "Airtime Bill Payments"
    elif "cash power" in body_lower:
        return "Cash Power Bill Payments"
    elif "transaction initiated by" in body_lower:
        return "Transactions Initiated by Third Parties"
    elif "withdraw" in body_lower or "agent" in body_lower:
        return "Withdrawals from Agents"
    elif "bank transfer" in body_lower:
        return "Bank Transfers"
    elif "internet" in body_lower or "voice bundle" in body_lower:
        return "Internet and Voice Bundle Purchases"
    elif re.search(r"\d+ rwf transferred to .* from \d+", body_lower):
        return "Transfers to Mobile Numbers"
    elif re.search(r"you have transferred \d[\d,]* rwf to .* \(\d+\) from your mobile money account", body_lower):
        return "Transfers to Mobile Numbers"
    elif "one-time password" in body_lower or "otp" in body_lower:
        return "OTP"
    elif "transaction with amount" in body_lower and "failed" in body_lower:
        return "Failed Transaction"
    elif "has been reversed" in body_lower or "a reversal has been initiated" in body_lower:
        return "Reversal"
    elif "umaze kugura" in body_lower:
        return "Bundle Purchase"
    elif "was successfully completed" in body_lower and "on your momo account" in body_lower:
        return "Merchant Payment"
    elif "deposit rwf" in body_lower and "receiver" in body_lower:
        return "Deposit"

    return None

# this function will extract ammount and make it integer
def extract_amount(body):
    # checking where meesages have [ <amount> RWF ]
    match = re.search(r"\b(\d[\d,]*)\s*RWF\b", body, re.IGNORECASE)
    if not match:
        # checking where meesages have [ RWF <amount> ]
        match = re.search(r"\bRWF\s*(\d[\d,]*)\b", body, re.IGNORECASE)
    if match:
        return int(match.group(1).replace(",", ""))
    return None

# extracting the balance from the messages
def extract_balance(body):
    match = re.search(r"new balance[:\-]?\s*([\d,]+)", body, re.IGNORECASE)
    if match:
        return int(match.group(1).replace(",", ""))
    return None

# extracting transaction id from the messsages
def extract_transaction_id(body):
    match = re.search(
        r"(Financial Transaction Id|Transaction ID)[:\-]?\s*(\d+)", body, re.IGNORECASE)
    return match.group(2) if match else None

# here we extract phone number from the messages
def extract_phone_number(body):
    # Match phone numbers in various formats 
    match = re.search(r'(?:\+?250|0)?(7[0-9]{8})\b', body)
    return match.group(0) if match else None

# convert timestamp
def convert_date(timestamp):
    try:
        return datetime.fromtimestamp(int(timestamp)/1000).isoformat()
    except:
        return None

# our main extraction loop
for sms in root.findall('sms'):
    try:
        body = sms.attrib.get("body")
        date_raw = sms.attrib.get("date")

        if not body or not date_raw:
            raise ValueError("missing required fields")

        category = categorize_sms(body)
        if not category:
            raise ValueError("could not categorize")

        structured_sms = {
            "category": category,
            "amount_rwf": extract_amount(body),
            "date": convert_date(date_raw),
            "message": body,
            "balance": extract_balance(body),
            "transaction_id": extract_transaction_id(body),
            "phone_number": extract_phone_number(body) 
        }

        categorized_data.append(structured_sms)

    except Exception as e:
        unprocessed_messages.append({
            "body": sms.attrib.get("body", ""),
            "date": sms.attrib.get("date", ""),
            "error": str(e)
        })

# now we will put the cleaned data to JSON file "cleaned_sms.json"
with open("cleaned_sms.json", "w", encoding="utf-8") as f:
    json.dump(categorized_data, f, indent=2, ensure_ascii=False)

# unprocessed messages are going to be saved to log file "unprocessed_sms.log"
with open("unprocessed_sms.log", "w", encoding="utf-8") as f:
    for msg in unprocessed_messages:
        f.write(json.dumps(msg, ensure_ascii=False) + "\n")

print(
    f"processed: {len(categorized_data)} & unprocessed: {len(unprocessed_messages)}")