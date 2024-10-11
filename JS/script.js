$(document).ready(function() { // Upewnia się, że kod uruchomi się po załadowaniu dokumentu

    // Inicjalizacja slideshow
    $('.slideshow').cycle({
        fx: 'fade', // Efekt przejścia między obrazami (zanikanie)
        speed: 1000, // Czas trwania efektu przejścia w milisekundach
        timeout: 3000 // Czas między przejściami (pokaz slajdów) w milisekundach
    });

    // Funkcja do zmiany rozmiarów obrazów w sekcjach
    function resizeImages() {
        $('.section').each(function() {
            var sectionTextHeight = $(this).find('.section-text').outerHeight(); // Pobierz wysokość tekstu w sekcji
            $(this).find('img').css('height', sectionTextHeight + 'px'); // Ustaw wysokość obrazu na wysokość tekstu
        });
    }

    resizeImages(); // Wywołanie funkcji zmiany rozmiarów obrazów
    $(window).resize(resizeImages); // Ponowne wywołanie funkcji przy zmianie rozmiaru okna

    // Inicjalizacja Lightbox2
    lightbox.option({
        'resizeDuration': 200, // Czas trwania efektu zmiany rozmiaru
        'wrapAround': true // Możliwość przewijania do pierwszego obrazu po ostatnim
    });

    // Monitorowanie przewijania strony
    var bannerHeight = $('.baner').outerHeight(); // Pobierz wysokość baneru
    var navContainer = $('.nav-container'); // Pobierz kontener nawigacji

    $(window).scroll(function() {
        if ($(this).scrollTop() > bannerHeight) {
            navContainer.show(); // Pokazanie kontenera nawigacji po przewinięciu strony poniżej wysokości baneru
        } else {
            navContainer.hide(); // Ukrycie kontenera nawigacji, gdy strona jest przewinięta powyżej baneru
        }
    });

    // Obsługa kliknięcia w sekcję mapy
    $('#map-section').on('click', function() {
        var mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2442.924643229716!2d21.012229115800554!3d52.229675779756865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc669ffb2b5d%3A0x8f0ab5ffabc50d23!2sWarszawa%2C%20Polska!5e0!3m2!1spl!2sus!4v1620300602718!5m2!1spl!2sus";
        var iframe = '<iframe src="' + mapUrl + '" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'; // Tworzenie elementu iframe z linkiem do mapy
        $('.overlay').html('<button class="close-btn">X</button>' + iframe).fadeIn(); // Wstawienie iframe z mapą i pokazanie nakładki z przyciskiem zamknięcia

        $('.close-btn').on('click', function() {
            $('.overlay').fadeOut(); // Ukrycie nakładki po kliknięciu przycisku zamknięcia
        });
    });

    // Zmienna z document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('DOMContentLoaded', function() {
        function adjustNav() {
            const nav = document.querySelector('.nav'); // Pobierz element nawigacji
            const navContainer = document.querySelector('.nav-container'); // Pobierz kontener nawigacji

            if (window.innerWidth <= 768) { // Sprawdź, czy szerokość okna jest mniejsza lub równa 768 pikseli
                navContainer.appendChild(nav); // Przenieś nawigację pod baner
                nav.style.position = 'static'; // Ustaw pozycję nawigacji na statyczną
                nav.style.flexDirection = 'column'; // Ustaw kierunek elastycznego układu na kolumnowy
                nav.style.alignItems = 'center'; // Wyrównaj elementy na środku
                nav.style.gap = '5px'; // Ustaw odstęp między elementami
                nav.style.marginTop = '10px'; // Ustaw górny margines
            } else {
                document.querySelector('.baner').appendChild(nav); // Przenieś nawigację do baneru
                nav.style.position = 'absolute'; // Ustaw pozycję nawigacji na absolutną
                nav.style.bottom = '10px'; // Ustaw dolną pozycję
                nav.style.left = '50%'; // Ustaw lewą pozycję na 50% szerokości
                nav.style.transform = 'translateX(-50%)'; // Przesuń nawigację w lewo o 50% jej szerokości
                nav.style.flexDirection = 'row'; // Ustaw kierunek elastycznego układu na wierszowy
                nav.style.alignItems = 'initial'; // Ustaw domyślne wyrównanie elementów
                nav.style.gap = '10px'; // Ustaw odstęp między elementami
                nav.style.marginTop = '0'; // Ustaw górny margines na 0
            }
        }

        window.addEventListener('resize', adjustNav); // Dodaj nasłuchiwacz zmiany rozmiaru okna
        adjustNav(); // Wywołaj funkcję przy załadowaniu strony
    });

});

//Forum
$(document).ready(function() { // Upewnia się, że kod uruchomi się po załadowaniu dokumentu

    // Pokaż/ukryj pole oceny w zależności od wybranego tematu
    $('#topic').change(function() {
        if ($(this).val() === 'gastronomia' || $(this).val() === 'atrakcje' || $(this).val() === 'nocleg') {
            $('#rating-group').show(); // Pokaż pole oceny
        } else {
            $('#rating-group').hide(); // Ukryj pole oceny
        }
    });

    // Formularz na forum
    $('#forum-form').on('submit', function(e) {
        e.preventDefault(); // Zablokuj domyślne działanie formularza

        // Walidacja formularza
        var firstName = $('#first-name').val(); // Pobierz wartość pola "Imię"
        var lastName = $('#last-name').val(); // Pobierz wartość pola "Nazwisko"
        var gender = $('input[name="gender"]:checked').val(); // Pobierz wartość zaznaczonego pola "Płeć"
        var email = $('#email').val(); // Pobierz wartość pola "Email"
        var topic = $('#topic').val(); // Pobierz wartość pola "Wybierz temat"
        var message = $('#message').val(); // Pobierz wartość pola "Wiadomość"
        var rating = $('#rating').val(); // Pobierz wartość pola "Ocena"
        var photo = $('#photo').prop('files')[0]; // Pobierz plik zdjęcia
        var photoUrl = photo ? URL.createObjectURL(photo) : ''; // Utwórz URL dla zdjęcia

        if (!firstName || !lastName || !gender || !email || !topic || !message) {
            alert('Proszę wypełnić wszystkie wymagane pola.'); // Wyświetl alert jeśli któreś z wymaganych pól jest puste
            return; // Przerwij działanie funkcji
        }

        // Tworzenie obiektu wpisu
        var entry = {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            email: email,
            topic: topic,
            message: message,
            rating: topic !== 'general' ? rating : null, // Dodaj ocenę tylko, jeśli temat nie jest "general"
            photoUrl: photoUrl,
            date: new Date().toLocaleString() // Dodaj datę i godzinę dodania wpisu
        };

        // Wyświetlenie okna z potwierdzeniem danych
        var confirmationDetails = `
            <strong>Imię:</strong> ${entry.firstName}<br>
            <strong>Nazwisko:</strong> ${entry.lastName}<br>
            <strong>Płeć:</strong> ${entry.gender === 'male' ? 'Mężczyzna' : 'Kobieta'}<br>
            <strong>Email:</strong> ${entry.email}<br>
            <strong>Temat:</strong> ${entry.topic}<br>
            <strong>Wiadomość:</strong> ${entry.message}<br>
            ${entry.rating ? '<strong>Ocena:</strong> ' + entry.rating + '<br>' : ''}
            ${entry.photoUrl ? '<a href="' + entry.photoUrl + '" data-lightbox="entry-' + entry.firstName + '" data-title="Zdjęcie użytkownika"><img src="' + entry.photoUrl + '" alt="Zdjęcie" style="max-width: 500px; max-height: 500px;"></a><br>' : ''}
            <strong>Data:</strong> ${entry.date}
        `;
        $('#confirmation-details').html(confirmationDetails); // Dodaj szczegóły wpisu do okna potwierdzenia
        $('#confirmation-modal').show(); // Pokaż okno potwierdzenia

        $('#confirm-submit').off('click').on('click', function() {
            // Zapisywanie wpisu w localStorage
            var entries = JSON.parse(localStorage.getItem('forumEntries')) || []; // Pobierz istniejące wpisy z localStorage lub utwórz nową tablicę
            var editIndex = $('#forum-form').data('edit-index'); // Pobierz indeks edytowanego wpisu
            if (editIndex !== undefined) {
                entries[editIndex] = entry; // Zastąp istniejący wpis nowym wpisem
                $('#forum-form').removeData('edit-index'); // Usuń dane edytowanego wpisu
            } else {
                entries.push(entry); // Dodaj nowy wpis do tablicy
            }
            localStorage.setItem('forumEntries', JSON.stringify(entries)); // Zapisz wpisy w localStorage

            // Resetowanie formularza
            $('#forum-form')[0].reset(); // Zresetuj formularz
            $('#rating-group').hide(); // Ukryj pole oceny

            // Wyświetlanie wpisów
            displayEntries(); // Wywołaj funkcję wyświetlania wpisów

            // Ukrywanie okna potwierdzenia
            $('#confirmation-modal').hide(); // Ukryj okno potwierdzenia
        });

        // Ukrywanie okna potwierdzenia
        $('.close-modal').on('click', function() {
            $('#confirmation-modal').hide(); // Ukryj okno potwierdzenia
        });
    });

    // Funkcja do wyświetlania wpisów
    function displayEntries() {
        var entries = JSON.parse(localStorage.getItem('forumEntries')) || []; // Pobierz istniejące wpisy z localStorage lub utwórz nową tablicę
        var filterTopic = $('#filter-topic').val(); // Pobierz wybraną opcję filtrowania
        var entriesList = $('#entries-list'); // Pobierz element listy wpisów
        entriesList.empty(); // Wyczyść element listy wpisów

        entries.forEach(function(entry, index) {
            if (filterTopic === 'all' || entry.topic === filterTopic) { // Sprawdź, czy wpis pasuje do wybranego filtra
                var entryHtml = `
                    <table class="entry-table">
                        <tr>
                            <td><strong>Imię i Nazwisko:</strong></td>
                            <td>${entry.firstName} ${entry.lastName}</td>
                        </tr>
                        <tr>
                            <td><strong>Płeć:</strong></td>
                            <td>${entry.gender === 'male' ? 'Mężczyzna' : 'Kobieta'}</td>
                        </tr>
                        <tr>
                            <td><strong>Email:</strong></td>
                            <td>${entry.email}</td>
                        </tr>
                        <tr>
                            <td><strong>Wiadomość:</strong></td>
                            <td>${entry.message}</td>
                        </tr>
                        ${entry.rating ? '<tr><td><strong>Ocena:</strong></td><td>' + entry.rating + '</td></tr>' : ''}
                        ${entry.photoUrl ? '<tr><td><strong>Zdjęcie:</strong></td><td><a href="' + entry.photoUrl + '" data-lightbox="entry-' + entry.firstName + '" data-title="Zdjęcie użytkownika"><img src="' + entry.photoUrl + '" alt="Zdjęcie" style="max-width: 500px; max-height: 500px;"></a></td></tr>' : ''}
                        <tr>
                            <td><strong>Data:</strong></td>
                            <td>${entry.date}</td>
                        </tr>
                        <tr>
                            <td colspan="2" class="entry-buttons">
                                <button class="edit-btn" data-index="${index}">Edytuj</button>
                                <button class="delete-btn" data-index="${index}">Usuń</button>
                            </td>
                        </tr>
                    </table>
                `;
                entriesList.append(entryHtml); // Dodaj wpis do listy
            }
        });

        // Obsługa usuwania wpisów
        $('.delete-btn').on('click', function() {
            var index = $(this).data('index'); // Pobierz indeks wpisu
            var entries = JSON.parse(localStorage.getItem('forumEntries')) || []; // Pobierz istniejące wpisy z localStorage
            entries.splice(index, 1); // Usuń wpis z tablicy
            localStorage.setItem('forumEntries', JSON.stringify(entries)); // Zapisz zaktualizowaną tablicę w localStorage
            displayEntries(); // Wywołaj funkcję wyświetlania wpisów
        });

        // Obsługa edytowania wpisów
        $('.edit-btn').on('click', function() {
            var index = $(this).data('index'); // Pobierz indeks wpisu
            var entries = JSON.parse(localStorage.getItem('forumEntries')) || []; // Pobierz istniejące wpisy z localStorage
            var entry = entries[index]; // Pobierz wpis z tablicy
            $('#first-name').val(entry.firstName); // Ustaw wartość pola "Imię"
            $('#last-name').val(entry.lastName); // Ustaw wartość pola "Nazwisko"
            $('input[name="gender"][value="' + entry.gender + '"]').prop('checked', true); // Ustaw zaznaczenie pola "Płeć"
            $('#email').val(entry.email); // Ustaw wartość pola "Email"
            $('#topic').val(entry.topic); // Ustaw wartość pola "Wybierz temat"
            $('#message').val(entry.message); // Ustaw wartość pola "Wiadomość"
            if (entry.rating) {
                $('#rating').val(entry.rating); // Ustaw wartość pola "Ocena"
                $('#rating-group').show(); // Pokaż pole oceny
            } else {
                $('#rating-group').hide(); // Ukryj pole oceny
            }
            $('#forum-form').data('edit-index', index); // Zapisz indeks edytowanego wpisu
        });
    }

    // Obsługa filtrowania wpisów
    $('#filter-topic').change(function() {
        displayEntries(); // Wywołaj funkcję wyświetlania wpisów przy zmianie filtra
    });

    // Wyświetlanie wpisów przy ładowaniu strony
    displayEntries(); // Wywołaj funkcję wyświetlania wpisów przy ładowaniu strony
});
