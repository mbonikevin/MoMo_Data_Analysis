import sqlite3
import json
from typing import List, Dict

#we create a SQLite db

def create_database(db_name: str = "transactions.db") -> sqlite3.Connection:
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()

#create a transaction table if it does not exist

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT,
        amount_rwf INTEGER,
        date TEXT,
        message TEXT UNIQUE,  
        balance INTEGER,
        transaction_id TEXT,
        phone_number TEXT
    )
    """)
    
    #creates an index to help in fasten the queries when sorting by categories
    
    cursor.execute("""
    CREATE INDEX IF NOT EXISTS idx_category ON transactions (category)
    """)
    
    #commits the changes to the db
    
    conn.commit()
    return conn

#imports categorized SMS data from the json file to the db

def import_from_json(conn: sqlite3.Connection, json_file: str = "cleaned_sms.json") -> int:
    try:
         #pens and load the JSON data from the specified file.
        with open(json_file, "r", encoding="utf-8") as f:
            data: List[Dict] = json.load(f)
    except FileNotFoundError:
        print(f"Error: File {json_file} not found")
        return 0
    
    cursor = conn.cursor()
    success_count = 0
    
     # Iterate through each entry in the loaded json data.
    
    for entry in data:
        try:
             # Insert the data into the transactions table.
            cursor.execute("""
                INSERT OR IGNORE INTO transactions (
                    category, amount_rwf, date, message, 
                    balance, transaction_id, phone_number
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                entry.get("category"),
                entry.get("amount_rwf"),
                entry.get("date"),
                entry.get("message"),
                entry.get("balance"),
                entry.get("transaction_id"),
                entry.get("phone_number")
            ))
            success_count += 1
        except sqlite3.Error as e:
            print(f"error: {e}")
    
     # commit all successful insertions to the database.
    conn.commit()
    return success_count

# main execution function to create the database and import data
def main():
    conn = create_database()
    imported = import_from_json(conn)
    conn.close()

if __name__ == "__main__":
    main()