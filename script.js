// Récupère les données des cours depuis le fichier JSON
fetch('cours.json')
    .then(response => response.json())
    .then(data => {
        const coursList = document.getElementById('courseList');
        
        data.forEach(cours => {
            const courseElement = document.createElement('div');
            courseElement.className = 'course';
            courseElement.innerHTML = `
                <h3>${cours.titre}</h3>
                <p class="professeur">Professeur: ${cours.professeur}</p>
                <p class="description">${cours.description}</p>
                <p class="matiere">Matière: ${cours.matiere}</p>
                <div class="links">
                    ${cours.fichiers.map(file => 
                        `<a href="../content/cours/${file.nom}" class="btn" download>Télécharger ${file.type}</a>`
                    ).join('')}
                </div>
            `;
            coursList.appendChild(coursElement);
        });
    })
    .catch(error => console.error('Erreur de chargement des cours:', error));

// Fonctionnalité de recherche et filtre
document.getElementById('search').addEventListener('input', filterCours);
document.getElementById('filter').addEventListener('change', filterCours);

function filterCours() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filterValue = document.getElementById('filter').value;
    const courses = document.querySelectorAll('.course');
    
    course.forEach(cours => {
        const title = cours.querySelector('h3').textContent.toLowerCase();
        const matiere = cours.querySelector('.matiere').textContent.toLowerCase();
        const matchesSearch = title.includes(searchTerm);
        const matchesFilter = filterValue === 'all' || matiere.includes(filterValue);
        
        if (matchesSearch && matchesFilter) {
            cours.style.display = 'block';
        } else {
            course.style.display = 'none';
        }
    });
}
