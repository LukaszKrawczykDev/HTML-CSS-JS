$(document).ready(function () { // Uruchom kod po załadowaniu całego dokumentu HTML
    var w, container, carousel, item, radius, itemLength, rY, ticker, fps; // Zdefiniowanie zmiennych dla różnych elementów i parametrów
    var mouseX = 0; // Inicjalizacja zmiennej przechowującej pozycję X kursora
    var mouseY = 0; // Inicjalizacja zmiennej przechowującej pozycję Y kursora
    var mouseZ = 0; // Inicjalizacja zmiennej przechowującej pozycję Z (głębię) kursora
    var addX = 0; // Inicjalizacja zmiennej do dodawania wartości X dla rotacji karuzeli
    var isAnimating = true; // Flaga wskazująca, czy animacja jest uruchomiona

    var fps_counter = { // Obiekt do liczenia FPS (klatek na sekundę)
        tick: function () { // Metoda do obliczania FPS
            this.times = this.times.concat(+new Date()); // Dodanie aktualnego czasu do tablicy times
            var seconds, times = this.times; // Deklaracja zmiennych pomocniczych
            if (times.length > this.span + 1) { // Sprawdzenie, czy liczba zapisanych czasów przekracza span
                times.shift(); // Usunięcie najstarszego zapisanego czasu
                seconds = (times[times.length - 1] - times[0]) / 1000; // Obliczenie różnicy czasu w sekundach
                return Math.round(this.span / seconds); // Obliczenie i zwrócenie liczby FPS
            } else return null; // Jeśli nie ma wystarczająco danych, zwróć null
        },
        times: [], // Tablica przechowująca czasy poszczególnych klatek
        span: 20 // Liczba klatek używana do obliczania FPS
    };
    var counter = Object.create(fps_counter); // Stworzenie instancji obiektu licznika FPS

    function init() { // Funkcja inicjująca całą animację
        w = $(window); // Przypisanie obiektu okna do zmiennej
        container = $('#contentContainer'); // Przypisanie głównego kontenera do zmiennej
        carousel = $('#carouselContainer'); // Przypisanie kontenera karuzeli do zmiennej
        item = $('.carouselItem'); // Przypisanie elementów karuzeli do zmiennej
        itemLength = item.length; // Zapisanie liczby elementów karuzeli
        fps = $('#fps'); // Przypisanie elementu wyświetlającego FPS do zmiennej
        rY = 360 / itemLength; // Obliczenie kąta rotacji dla każdego elementu karuzeli
        radius = Math.round((250) / Math.tan(Math.PI / itemLength)); // Obliczenie promienia karuzeli

        TweenMax.set(container, { perspective: 600 }); // Ustawienie perspektywy 3D dla kontenera
        TweenMax.set(carousel, { z: -(radius) }); // Ustawienie położenia Z dla karuzeli

        for (var i = 0; i < itemLength; i++) { // Iteracja przez wszystkie elementy karuzeli
            var $item = item.eq(i); // Pobranie bieżącego elementu karuzeli
            var $block = $item.find('.carouselItemInner'); // Pobranie wewnętrznego bloku bieżącego elementu
            TweenMax.set($item, { rotationY: rY * i, z: radius, transformOrigin: "50% 50% " + -radius + "px" }); // Ustawienie rotacji i położenia Z dla bieżącego elementu
            animateIn($item, $block); // Wywołanie funkcji animującej wprowadzenie elementu
        }

        window.addEventListener("mousemove", onMouseMove, false); // Dodanie nasłuchiwania ruchu myszy
        ticker = setInterval(looper, 1000 / 60); // Uruchomienie pętli animacji z częstotliwością 60 klatek na sekundę
    }

    function animateIn($item, $block) { // Funkcja animująca wprowadzenie elementu karuzeli
        var $nrX = 360 * getRandomInt(2); // Losowy kąt rotacji X
        var $nrY = 360 * getRandomInt(2); // Losowy kąt rotacji Y
        var $nx = -(2000) + getRandomInt(4000); // Losowa pozycja X
        var $ny = -(2000) + getRandomInt(4000); // Losowa pozycja Y
        var $nz = -4000 + getRandomInt(4000); // Losowa pozycja Z
        var $s = 1.5 + (getRandomInt(10) * .1); // Losowy czas trwania animacji
        var $d = 1 - (getRandomInt(8) * .1); // Losowe opóźnienie animacji

        TweenMax.set($item, { autoAlpha: 1, delay: $d }); // Ustawienie widoczności i opóźnienia dla elementu
        TweenMax.set($block, { z: $nz, rotationY: $nrY, rotationX: $nrX, x: $nx, y: $ny, autoAlpha: 0 }); // Ustawienie pozycji i rotacji bloku
        TweenMax.to($block, $s, { delay: $d, rotationY: 0, rotationX: 0, z: 0, ease: Expo.easeInOut }); // Animacja rotacji i pozycji Z bloku
        TweenMax.to($block, $s - .5, { delay: $d, x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut }); // Animacja pozycji X i Y oraz widoczności bloku
    }

    function onMouseMove(event) { // Funkcja obsługująca ruch myszy
        mouseX = -(-(window.innerWidth * .5) + event.pageX) * .0025; // Obliczenie nowej wartości X na podstawie pozycji kursora
        mouseY = -(-(window.innerHeight * .5) + event.pageY) * .01; // Obliczenie nowej wartości Y na podstawie pozycji kursora
        mouseZ = -(radius) - (Math.abs(-(window.innerHeight * .5) + event.pageY) - 200); // Obliczenie nowej wartości Z na podstawie pozycji kursora
    }

    function looper() { // Funkcja pętli animacji
        if (isAnimating) { // Sprawdzenie, czy animacja jest włączona
            addX += mouseX; // Dodanie wartości X z myszy do ogólnej rotacji
            TweenMax.to(carousel, 1, { rotationY: addX, rotationX: mouseY, ease: Quint.easeOut }); // Animacja karuzeli
            TweenMax.set(carousel, { z: mouseZ }); // Ustawienie położenia Z dla karuzeli
            fps.text('Framerate: ' + counter.tick() + '/60 FPS'); // Wyświetlenie aktualnej liczby FPS
        }
    }

    function getRandomInt($n) { // Funkcja generująca losową liczbę całkowitą
        return Math.floor((Math.random() * $n) + 1); // Zwrócenie losowej liczby z przedziału od 1 do $n
    }

    function toggleAnimation() { // Funkcja przełączająca animację
        isAnimating = !isAnimating; // Odwrócenie stanu animacji (włączenie/wyłączenie)
        $('#toggleAnimation').text(isAnimating ? 'Pauza' : 'Wznów'); // Zmiana tekstu przycisku w zależności od stanu animacji
    }

    $('#toggleAnimation').click(toggleAnimation); // Dodanie obsługi kliknięcia do przycisku przełączania animacji

    init(); // Wywołanie funkcji inicjującej
});
