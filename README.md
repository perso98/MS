# Aplikacja Social Media

Jest to aplikacja związana z social mediami, gdzie użytkownicy mogą rejestrować się, logować, tworzyć posty, lajkować posty, dodawać komentarze, lajkować komentarze, usuwać komentarze i posty, wyszukiwać użytkowników i posty oraz sprawdzać followy i followersów innych użytkowników.

## Jak uruchomić projekt

### Wymagania

Upewnij się, że masz zainstalowane na swoim systemie:
- Node.js
- npm (Node Package Manager)
- MongoDB

### Instalacja

1. Sklonuj repozytorium na swój lokalny komputer:
   ```bash
   git clone https://github.com/twoj-nazwa-uzytkownika/twoje-repozytorium.git
   cd twoje-repozytorium
   ```

2. Zainstaluj niezbędne zależności zarówno dla klienta, jak i serwera:
   ```bash
   npm install
   ```

3. Zainstaluj `concurrently`, aby uruchomić jednocześnie klienta i serwera:
   ```bash
   npm install concurrently --save-dev
   ```

4. Utwórz plik `.env` w katalogu `server` na podstawie pliku `.env-sample`. Zaktualizuj go, dodając swój łańcuch połączenia MongoDB i inne zmienne środowiskowe, jeśli są potrzebne. Na przykład:
   ```
   MONGO_URL=mongodb://localhost:27017/nazwa-twojej-bazy-danych
   PORT=5000
   ```

### Uruchamianie aplikacji

1. Aby jednocześnie uruchomić klienta i serwera, uruchom następujące polecenie z głównego katalogu projektu:
   ```bash
   npm start
   ```

### Funkcje

- **Rejestracja i logowanie użytkowników:** Użytkownicy mogą tworzyć nowe konta i logować się do aplikacji.
- **Tworzenie postów:** Użytkownicy mogą tworzyć nowe posty i dzielić się nimi z innymi.
- **Lajkowanie postów:** Użytkownicy mogą lajkować posty.
- **Dodawanie komentarzy:** Użytkownicy mogą dodawać komentarze do postów.
- **Lajkowanie komentarzy:** Użytkownicy mogą lajkować komentarze.
- **Usuwanie komentarzy i postów:** Użytkownicy mogą usuwać swoje komentarze i posty.
- **Wyszukiwanie użytkowników i postów:** Użytkownicy mogą wyszukiwać innych użytkowników i posty.
- **Obserwowanie i followersi:** Użytkownicy mogą sprawdzać listę swoich obserwujących i obserwowanych.
- **Powiadomienia:** Podstawowy system powiadomień, który informuje użytkowników o interakcjach.

### Planowane funkcje

- **Ulepszony system powiadomień:** Trwają prace nad usprawnieniem systemu powiadomień, aby zapewnić lepsze doświadczenia użytkowników.
- **Walki Pokemon:** Użytkownicy będą mogli brać udział w walkach Pokemon, w tym losować Pokemony, zdobywać dla nich doświadczenie i wiele więcej.

Bądź na bieżąco z kolejnymi ekscytującymi funkcjami!
