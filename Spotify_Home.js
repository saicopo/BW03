const URL_API = "https://striveschool-api.herokuapp.com/api/deezer/search?q="

// FUNZIONE PER PRENDERE E MOSTRARE IN PAGINA ALBUM RANDOM 

const artistNames = ["Queen", "The Beatles", "Adele", "Nirvana", "Taylor Swift", "Elton John"]; //scelta artisti

function getRandomAlbums() {
    const promises = artistNames.map(artist => 
        fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Errore nella richiesta GET");
                }
                return response.json();
            })
            .then(data => data.data) // Restituisce l'array di album
    );

    // Risolvi tutte le promesse
    Promise.all(promises)
        .then(allAlbums => {
            // Unire l'array di array in un singolo array
            const flatAlbumList = [].concat(...allAlbums);

            // Usa un Set per tenere traccia degli album unici
            const seen = new Set();
            const uniqueAlbums = [];




            flatAlbumList.forEach(album => {
                const key = `${album.album.title}-${album.artist.name}`; // Chiave unica basata su titolo e artista
                if (!seen.has(key)) {
                    seen.add(key); // Aggiungi la chiave al Set
                    uniqueAlbums.push(album); // Aggiungi l'album all'array di album unici
                }
            });

            // Mescola gli album unici e prendi i primi 10
            const randomAlbums = getRandomItems(uniqueAlbums, 10);
            mostraAlbum(randomAlbums);
        })
        .catch(error => {
            console.error(error);
        });
}

// Funzione per mescolare un array e restituire N elementi casuali
function getRandomItems(arr, n) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

function mostraAlbum(albumList) {
    const container = document.getElementById('albumsContainer');

    // Pulisci il contenitore prima di aggiungere i nuovi album con event listener nell'HTML per dettagli album
    container.innerHTML = '';

    albumList.forEach(album => {
        //DA USARE STESSO FORMAT DI ALBUM PER ARTISTA QUINDI CON A
        const albumCard = `
        <div class="col-3">
            <div class="album-card m-3" onclick="location.href='album.html?id=${album.album.id}'">
                <img src="${album.album.cover_big}" alt="${album.album.title}" class="album-cover img-fluid" />
                
                <a href="./album.html?id=${album.album.id}">${album.album.title}</a>

                <p>Artista: ${album.artist.name}</p>
            </div>
        </div>    
        `;
        
        container.innerHTML += albumCard; // Aggiungi la card all'elemento container
    });
}


// Chiamata alla funzione al caricamento della pagina
document.addEventListener('DOMContentLoaded', getRandomAlbums);

//DETTAGLI ALBUM

// Funzione per recuperare l'ID dall'URL e ottenere i dettagli dell'album
function getAlbumDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('id');

}

// Chiamata alla funzione al caricamento della pagina
document.addEventListener('DOMContentLoaded', getAlbumDetails);


