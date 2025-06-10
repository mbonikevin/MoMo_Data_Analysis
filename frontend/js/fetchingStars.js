async function fetchStarCount() {
    const repo = 'mbonikevin/MoMo_Data_Analysis'; // Replace with your repo
    const btn = document.getElementById('github-star-btn');
    const count = document.getElementById('star-count');

    try {
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        const data = await response.json();

        if (data.stargazers_count !== undefined) {
            count.textContent = `${data.stargazers_count}`;
            count.style.display = 'inline';
        }
    } catch (error) {
        console.log('Could not fetch star count');
    }
}

document.addEventListener('DOMContentLoaded', fetchStarCount)