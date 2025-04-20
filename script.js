// Récupère les données des cours depuis le fichier JSON
fetch('../data/cours.json')
    .then(response => response.json())
    .then(data => {
        const courseList = document.getElementById('courseList');
        
        data.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.className = 'course';
            courseElement.innerHTML = `
                <h3>${course.titre}</h3>
                <p class="professeur">Professeur: ${course.professeur}</p>
                <p class="description">${course.description}</p>
                <p class="matiere">Matière: ${course.matiere}</p>
                <div class="links">
                    ${course.fichiers.map(file => 
                        `<a href="../content/cours/${file.nom}" class="btn" download>Télécharger ${file.type}</a>`
                    ).join('')}
                </div>
            `;
            courseList.appendChild(courseElement);
        });
    })
    .catch(error => console.error('Erreur de chargement des cours:', error));

// Fonctionnalité de recherche et filtre
document.getElementById('search').addEventListener('input', filterCourses);
document.getElementById('filter').addEventListener('change', filterCourses);

function filterCourses() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filterValue = document.getElementById('filter').value;
    const courses = document.querySelectorAll('.course');
    
    courses.forEach(course => {
        const title = course.querySelector('h3').textContent.toLowerCase();
        const matiere = course.querySelector('.matiere').textContent.toLowerCase();
        const matchesSearch = title.includes(searchTerm);
        const matchesFilter = filterValue === 'all' || matiere.includes(filterValue);
        
        if (matchesSearch && matchesFilter) {
            course.style.display = 'block';
        } else {
            course.style.display = 'none';
        }
    });
}
