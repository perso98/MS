# Aplikacja Social Media

Jest to aplikacja związana z social mediami, gdzie użytkownicy mogą rejestrować się, logować, tworzyć posty, lajkować posty, dodawać komentarze, lajkować komentarze, usuwać komentarze i posty, wyszukiwać użytkowników i posty oraz sprawdzać followy i followersów innych użytkowników.

## Jak uruchomić projekt

### Wymagania

Upewnij się, że masz zainstalowane na swoim systemie:
- Node.js
- npm (Node Package Manager)

### Instalacja

1. Sklonuj repozytorium na swój lokalny komputer:
   ```bash
   gh repo clone perso98/MS---Social-app
   ```

2. Zainstaluj niezbędne zależności zarówno dla klienta, jak i serwera:
   ```bash
   npm install
   ```

3. Zainstaluj `concurrently`, aby uruchomić jednocześnie klienta i serwer:
   ```bash
   npm install concurrently --save-dev
   ```

4. Utwórz plik `.env` w katalogu `server` na podstawie pliku `.env-sample`. Zaktualizuj go, dodając swój łańcuch połączenia MongoDB i inne zmienne środowiskowe, jeśli są potrzebne. Na przykład:
   ```
   MONGO_URL=link-to-mongodb-url
   PORT = port-number
   ```

### Uruchamianie aplikacji

1. Aby jednocześnie uruchomić klienta i serwera, uruchom następujące polecenie z głównego katalogu projektu:
   ```bash
   npm start
   ```

### Funkcje

- **Rejestracja i logowanie użytkowników:** Użytkownicy mogą tworzyć nowe konta i logować się do aplikacji.
  ![image](https://github.com/perso98/MS---Social-app/assets/72854881/434f6762-a7e4-446c-91c7-1742c0379d0b)
  ![image](https://github.com/perso98/MS---Social-app/assets/72854881/f5bfedf1-69c2-4adb-8b58-0ef549864fd8)

- **Tworzenie postów:** Użytkownicy mogą tworzyć nowe posty i dzielić się nimi z innymi.
  ![image](https://github.com/perso98/MS---Social-app/assets/72854881/d0e63fdb-2a71-47f1-91c8-693896feb7cd)

- **Lajkowanie postów:** Użytkownicy mogą lajkować posty.
  ![image](https://github.com/perso98/MS---Social-app/assets/72854881/253fbedd-b151-4b0f-9c8f-9010f7297e4f)

  
- **Dodawanie komentarzy:** Użytkownicy mogą dodawać komentarze do postów.
  ![image](https://github.com/perso98/MS---Social-app/assets/72854881/a69fdec4-bd01-4dc7-8c1c-ef15b71d8ad8)

- **Lajkowanie komentarzy:** Użytkownicy mogą lajkować komentarze.
  ![image](https://github.com/perso98/MS---Social-app/assets/72854881/6fc5510f-c9b0-4736-b576-a31931b18647)

- **Usuwanie komentarzy i postów:** Użytkownicy mogą usuwać swoje komentarze i posty.
![image](https://github.com/perso98/MS---Social-app/assets/72854881/6c5c98d4-f894-4b57-ac32-20478979839b)
![image](https://github.com/perso98/MS---Social-app/assets/72854881/c50e5e99-6c62-45bc-8e99-e213ee164d13)
![image](https://github.com/perso98/MS---Social-app/assets/72854881/9dd5503e-80ab-4bbe-8d16-105f0573526c)

- **Wyszukiwanie użytkowników i postów:** Użytkownicy mogą wyszukiwać innych użytkowników i posty.
  ![image](https://github.com/perso98/MS---Social-app/assets/72854881/9750abbc-8c62-4e13-bf02-42d9d4f679b1)

- **Obserwowanie i followersi:** Użytkownicy mogą sprawdzać listę swoich obserwujących i obserwowanych.
  ![image](https://github.com/perso98/MS---Social-app/assets/72854881/73a5e0e8-bae6-4bb5-8ab1-9fc5c205ec1d)

  
- **Powiadomienia:** Podstawowy system powiadomień, który informuje użytkowników o interakcjach.
 ![image](https://github.com/perso98/MS---Social-app/assets/72854881/e05eb27e-2fce-4c01-895d-59cb11342247)


### Planowane funkcje

- **Ulepszony system powiadomień:** Trwają prace nad usprawnieniem systemu powiadomień, aby zapewnić lepsze doświadczenia użytkowników.
- **Walki Pokemon:** Użytkownicy będą mogli brać udział w walkach Pokemon, w tym losować Pokemony, zdobywać dla nich doświadczenie i wiele więcej.
  Używając api pokemonów.
  ![image](https://github.com/perso98/MS---Social-app/assets/72854881/d23cf5fc-2076-4a08-8a20-342c12e0337b)


Bądź na bieżąco z kolejnymi ekscytującymi funkcjami!
