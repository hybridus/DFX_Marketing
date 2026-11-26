# Project 01 Türkçe sürüm: plan (uygulandı)

Hedef: İngilizce final (kilitli, `ENGLISH_LOCK.sha256`) değişmeden Türkçe seslendirme + Türkçe ekran metni.

| Adım | Yöntem | Durum |
|---|---|---|
| 1 İngilizceyi kilitle | sha256 + salt-okunur; her çalıştırmada `sha256sum -c ENGLISH_LOCK.sha256` | Tamam |
| 2 Ses | Kerem, 11 take, `vo/s00..s10b.mp3` | Tamam |
| 3 Ekran metni | `i18n/tr.json` + `i18n/build_tr.py`: İngilizce `engine.js`/`environment.html` kopyalarına birebir değiştirme, eşleşme sayısı tutmazsa durur | Tamam |
| 4 Zamanlama | Görüntü zamanlaması İngilizceyle aynı. Sesler `mix_tr.py` içinde duraklarda kesilip görsel anlara oturtulur (sahne 0 ve sahne 2). Sahne 0'da risk satırı penceresi 19.4–23.5 s | Tamam |
| 5 Sığma testi | `i18n/check_fit.js` her 0,5 s'de tüm metinleri kutularına karşı ölçer | 0 taşma |
| 6 Render + karışım | `render.sh` → `renders/master_tr_silent.mp4`; `mix_tr.py` → `renders/master_tr_vo.mp4` (-16 LUFS, ambient yok) | Bkz. README |
