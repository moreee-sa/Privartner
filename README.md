# Privartner
<p>
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=white" />
</p>

**Privartner** è una web app open source per cifrare e decifrare messaggi direttamente nel browser, senza server, senza database, senza compromessi sulla privacy.

Questa idea e' nata al dibattivo europero "Chat Contro", la proposta legislativa che avrebbe imposto la sorveglianza di massa delle comunicazioni private.
Privartner ti permette di aggiungere un livello di crittografia a qualsiasi app di messaggistica già esistente (WhatsApp, Telegram, Instagram, email, ecc.).

## Funzionalità
- **Gestione contatti locale**: Crea contatti con nome e descrizione. Nessun dato viene mai inviato a server esterni.
- **Generazione automatica delle chiavi**: Ogni contatto ha la sua coppia di chiavi (privata e pubblica) che viene generata automaticamente.
- **Nascondi il messaggio**: Cifra il messaggio da inviare con la chiave pubblica del contatto prima di inviarla.
- **Mostra il messaggio**: Decifra i messaggi ricevuti usando la tua chiave privata.
- **Zero dipendenze crittografiche esterne**: Utilizza esclusivamente le **Web Crypto API** native del browser.
- **Tutto in locale**: Nessun account richiesto, nessun cloud. I tuoi dati restano sul tuo dispositivo.

## License
This project is licensed under the **[GPL v3.0](https://github.com/moreee-sa/Privartner/blob/main/LICENSE)**. © 2026 moreee-sa