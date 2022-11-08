## Automate Testing Using Postman

Melalui testing otomatis ini, kita bisa menguji nilai dari status code, properti header, hingga body respons. Pengujian otomatis akan “pass” (berhasil) ketika semua variabel yang diuji sesuai ekspektasi. Bila ada salah satu yang tidak sesuai, maka pengujian akan “failed” (gagal).

### Postman Collection

Merupakan tempat menyimpan kumpulan *request*, seperti sebuah folder yang menyimpan berkas, namun dalah hal ini berkas tersebut adalah *request*

Di Postman setiap request yang pernah dikirim, akan tersimpan dan bisa dilihat pada tab *history* di sidebar.

Dalam penggunaan yang ringan, memilih dan menggunakan kembali request melalui History merupakan pengalaman yang cukup nyaman. Namun bila Anda banyak melakukan request, history request akan menumpuk tidak karuan. Dengan begitu, Anda akan membutuhkan waktu yang lama untuk memilah dan memilih request yang ingin digunakan kembali. 

Dengan adanya collection, request bisa Anda kelompokkan sehingga lebih mudah untuk diakses.

Melalui collection, Anda bisa menjalankan seluruh request yang ada di dalamnya sekaligus dengan urutan yang dapat Anda sesuaikan.

### Postman Environment

Environment merupakan kumpulan dari variabel yang dapat digunakan pada request di Postman. Ketika melakukan pengujian otomatis, terkadang kita perlu menyimpan nilai pada sebuah variabel. Contohnya ketika melakukan request menambahkan catatan, kita akan mendapatkan id catatan tersebut dari server. Id tersebut perlu disimpan pada variabel agar dapat digunakan oleh request selanjutnya.