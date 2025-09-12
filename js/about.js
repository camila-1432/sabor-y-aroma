// Animación simple al hacer scroll
const teamMembers = document.querySelectorAll('.team-member');

window.addEventListener('scroll', () => {
    const triggerBottom = window.innerHeight / 5 * 4;

    teamMembers.forEach(member => {
        const memberTop = member.getBoundingClientRect().top;

        if(memberTop < triggerBottom){
            member.style.transform = 'translateY(0)';
            member.style.opacity = '1';
        }
    });
});
