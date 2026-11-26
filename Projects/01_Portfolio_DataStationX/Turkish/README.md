# Project 01 – Türkçe sürüm (Turkish version)

İngilizce final (`../`) **kilitli** (`../ENGLISH_LOCK.sha256`, dosyalar salt-okunur). Bu klasördeki hiçbir şey İngilizce dosyaları değiştirmez; doğrulama: `cd .. && sha256sum -c ENGLISH_LOCK.sha256`.

| Dosya | İçerik |
|---|---|
| `script/voiceover_tr.md`, `script/glossary_tr.md` | Türkçe VO metni (üretildiği haliyle) ve terim sözlüğü |
| `voice_choice.md` | Ses seçimi (Kerem `JxVRMGmWEfJgf2BnzIup`, eleven_v4) ve notlar |
| `vo/s00..s10b.mp3` | 11 take, satır başına tek üretim |
| `i18n/tr.json` | Ekran metni tablosu (birebir değiştirme, eşleşme sayısı doğrulanır) |
| `i18n/build_tr.py` | İngilizce `engine.js`/`environment.html` kopyalarından `engine.js` + `film3.html` üretir (üretilmiş dosyalar, elle düzenlemeyin) |
| `i18n/check_fit.js` | Her 0,5 s'de metin taşması testi (`node i18n/check_fit.js`) |
| `render.sh` | Sessiz master → `renders/master_tr_silent.mp4` (~8 dk) |
| `mix_tr.py` | Ses + UI sesleri → `renders/master_tr_vo.mp4` (-16 LUFS, ambient yok); parça zamanları `i18n/starts_tr.json` |

Yeniden üretim: `python3 -I i18n/build_tr.py && ./render.sh && python3 -I mix_tr.py`

Zamanlama: görüntü İngilizceyle aynı. Sahne 0'da risk satırı 19.4–23.5 s; s01 23.95 s; s05 88.5 s, s06 97.6 s (Türkçe s05 daha uzun). Sahne 0 ve s02 duraklarda kesilip ilgili görsel ana oturtulur.

Açık noktalar (Burak onayı): (1) ses kulakla seçilmedi; (2) slogan "Akışı Kontrol Edin, Operasyonu Güvenceye Alın" önerilen çeviridir, ekranda yazılı değildir; (3) sözlük tercihleri (Gizli ağ, arındırıldı, mühür, Denetim kaydı).
