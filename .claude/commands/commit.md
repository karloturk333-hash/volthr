Napravi git commit za trenutne promjene u Volt Studio projektu.

## Koraci

1. Pokreni `git status` da vidiš sve promijenjene fajlove
2. Pokreni `git diff` da razumiješ što je točno promijenjeno
3. Stagaj relevantne fajlove (izbjegaj `.env`, secrets, velike binarne fajlove)
4. Napiši commit message po konvenciji ispod
5. Napravi commit
6. Prikaži mi output

## Commit message format

```
<type>: <kratki opis na engleskom>

<opcionalni body ako je kompleksno>
```

Types: `feat`, `fix`, `refactor`, `docs`, `chore`, `perf`, `style`

Primjeri:
- `feat: add Google Ads add-on to pricing page`
- `fix: resolve mobile nav overflow on small screens`
- `style: update pricing tiers to €85/mo`

## Pravila

- Nikad ne commitaj `.env` ili fajlove sa secretima
- Nikad ne koristiš `--no-verify`
- Ako postoje TypeScript greške, upozori me prije commita
- Nemoj pushati — samo commit lokalno
