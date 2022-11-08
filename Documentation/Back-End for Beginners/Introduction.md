```javascript
Coding is fun, unless the BACKEND comes your way
```

# Apa itu Back-End

Back-End merupakan bagian dari aplikasi yang bertanggung jawab untuk menyediakan kebutuhan yang tak terlihat oleh pengguna., namun memiliki peran yang sangat penting. Dalam sebuah sistem aplikasi segala urusan yang tak terlihat oleh pengguna seperti *business logic*, *database*, *security*, *server stability*, menjadi tanggung jawab yang harus dikerjakan oleh seorang Back-End Developer.

---

# Server

Server berperan sebagai penyedia sumber daya berupa data, *services*, atau program untuk diberikan ke komputer lain. Penggunaan server sendiri lebih merujuk kepada sebuah sistem yang membuat perangkat seperti komputer dapat melayani sebuah permintaan dari perangkat lain. Berikut beberapa tipe server sesuai dengan layanannya;

- **File Server** : melayani penyimpanan dan pendistribusian berkas.
- **Application Server** : melayani hosting sebuah program atau aplikasi.
- **DNS Server** : mengubah nama domain (contoh: dicoding.com) ke dalam bentuk IP Address (contoh: 75.2.21.170).
- **Web Server** : melayani hosting sebuah program atau aplikasi (seperti Application Server) yang dapat diakses oleh client melalui internet maupun intranet.
- **Database Server** : melayani penyimpanan dan pendistribusian data terstruktur.

## Web Server dan Web Service

Dalam pengembangan sebuah sistem aplikas, kita perlu membuat dan menjalankan program dengan standar minimum yang bertujuan untuk menentukan logika bisnis sesuai dengan kebutuhan, dimana standar tersebut akan disimpan dallam sebuah server yang dapat diakses secara remote melalui internet maupun intranet agar aplikasi saling terhubung ( dari sisi *front-end* dan *back-end* ).  Jadi untuk membuat sistem aplikasi setidaknya membutuhkan:

- **Web Server** : Server yang dapat menjalankan program dan dapat diakses melalui internet atau intranet. 
- **Web Service** : Program yang dijalankan di web server agar kebutuhan bisnis terpenuhi.

Web service berjalan di dalam web server sehingga ia dapat diakses melalui internet. Melalui web service inilah aplikasi Front-End (_client_) dan Back-End dapat bertransaksi.

## Komunikasi Client-Server

HTTP/HTTPS merupakan salah satu protokol yang dapat digunakan untuk berinteraksi dengan web server. Protokol tersebut terkenal dengan pola *request*-*response*, artinya untuk mendapatkan sebuah *response* kita perlu melakukan *request* terlebih dahulu.

Ketika melakukan sebuah *request* perlu untuk menyisipkan informasi yang diperlukan sebagai sebuah detail, dalam sebuah *request* Informasi dapat mengandung:

- **Request Line**, berisikan method/verb seperti GET, POST, PUT, DELETE; path atau alamat yang diminta; dan versi HTTP yang digunakan
- **Header**, memuat informasi yang dilampirkan terkait *request* seperti format dokumen seperti *application/json*, *text/html*, dsb
- **Body (opsional)**, mengandung data yang dibutuhkan oleh server, bisa dalam bentuk teks, JSON, dll. Body tidak wajib dilampirkan bila server tidak membutuhkan data apapun

Apabila informasi yang dilampirkan pada request tidak jelas/sesuai, maka server akan menolaknya dengan respons negatif yang merupakan respons dari server ketika sebuah permintaan dari client gagal dipenuhi. Respons atau tanggapan yang dikirimkan dari server untuk client juga mengandung informasi. Berikut beberapa informasi yang dilampirkan oleh respons :

- **Status line** : berisikan HTTP versi yang digunakan; status code berupa tiga digit angka yang menandakan keberhasilan dari permintaan; reason phrase atau status text yang merupakan pesan berdasarkan status code dalam bentuk teks sehingga lebih mudah dimengerti.
- **Header** : mengandung informasi yang dilampirkan terkait response seperti format dokumen.
- **Body (opsional, namun biasanya selalu dilampirkan)** : memuat data yang dikirimkan oleh server. Data dapat berupa HTML, JSON, gambar, dsb.

Contoh dalam melakukan sebuah **HTTP Request**

>***cURL** atau **Client URL** merupakan software berbasis _command line_ yang dapat melakukan transaksi data melalui beberapa protokol internet, salah satunya HTTP/S. cURL dapat diakses secara langsung tanpa proses _install_ melalui Terminal (Linux dan Mac) atau CMD (Windows)*

*Dengan menggunakan ilustrasi dari skema pada sebuah kedai kopi*, berikut tiga skenario yang akan diimplementasikan dalam melakukan sebuah HTTP request dengan menggunakan *cURL*,

- **Meminta daftar kopi yang tersedia**

*Request*

```powershell
1.  curl -X GET https://coffee-api.dicoding.deva/coffees -i
```

- **curl** : merupakan perintah untuk menggunakan program cURL pada Terminal atau CMD.
- **-X GET** : menetapkan HTTP method/verb yang kita gunakan. GET berarti kita ingin mendapatkan sebuah data.
- [https://coffee-api.dicoding.dev/coffees](https://coffee-api.dicoding.dev/coffees) : merupakan alamat request yang dituju.
- **-i** : memberikan informasi detail terhadap response yang diberikan (HTTP response headers).

*Response*

```powershell
HTTP/1.1 200 OK
Server: nginx/1.18.0 (Ubuntu)
Date: Mon, 01 Nov 2021 07:41:52 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 188
Connection: keep-alive
content-security-policy: upgrade-insecure-requests
referrer-policy: strict-origin-when-cross-origin
x-frame-options: DENY
x-content-type-options: nosniff
x-xss-protection: 1; mode=block  
vary: origin
access-control-expose-headers: WWW-Authenticate,Server-Authorization
cache-control: no-cache
accept-ranges: bytes

{"message":"Berikut daftar kopi yang tersedia","coffees":[{"id":1,"name":"Kopi Tubruk","price":12000},{"id":2,"name":"Kopi Tarik","price":15000},{"id":3,"name":"Kopi Jawa","price":18000}]}
```

- **HTTP/1.1** : merupakan HTTP version yang digunakan oleh web server dalam menanggapi permintaan.
- **200** : merupakan status code dari request. Karena status code diawali dengan angka 2, berarti request kita berhasil dilakukan.
- **OK** : merupakan pesan teks dari status code, 200 berarti “OK”.
- **Content-Type: application/json;** : merupakan tipe konten yang digunakan web server dalam memberikan data. Karena nilainya application/json, itu berarti server menggunakan format json.
- **JSON Data (kode di bagian bawah)** : merupakan data yang diberikan oleh web server. Kita bisa melihat web server memberikan informasi kopi yang tersedia beserta harganya menggunakan format JSON.

- **Membeli kopi yang tersedia**

*Request*

```powershell
1.  curl -X POST -H "Content-Type: application/json" -d "{\"name\": \"Kopi Tubruk\"}" https://coffee-api.dicoding.dev/transactions -i
```

- **-X POST** : dalam request kali ini kita menggunakan method POST. Karena membeli bukan hanya meminta data, tapi akan mengubah jumlah stok kopi yang ada. Selain itu kita juga melampirkan data berupa kopi apa yang akan dipesan. Sehingga tidak masuk akal bila kita menggunakan GET request.
- **-H “Content-Type: application/json”** : Menetapkan nilai “Content-Type: application/json” pada Header request. Fungsinya untuk memberitahu server bahwa kita melampirkan data dalam bentuk JSON.
- **-d "JSON Content"** : merupakan data yang dilampirkan pada request. Data ini berformat JSON dan memiliki informasi kopi apa yang ingin dipesan
- [https://coffee-api.dicoding.dev/transactions](https://coffee-api.dicoding.dev/transactions)Merupakan alamat request yang dituju untuk membeli kopi.

*Response*

```powershell
HTTP/1.1 201 Created
Server: nginx/1.18.0 (Ubuntu)
Date: Mon, 01 Nov 2021 07:44:29 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 46
Connection: keep-alive
content-security-policy: upgrade-insecure-requests
referrer-policy: strict-origin-when-cross-origin
x-frame-options: DENY
x-content-type-options: nosniff
x-xss-protection: 1; mode=block
vary: origin
access-control-expose-headers: WWW-Authenticate,Server-Authorization
cache-control: no-cache

{"message":"Pesanan berhasil!","success":true}
```

- **Membeli kopi yang tidak tersedia**

*Request*

```powershell
1.  curl -X POST -H "Content-Type: application/json" -d "{\"name\": \"Kopi Luwak\"}" https://coffee-api.dicoding.dev/transactions -i
```

*Response*

```powershell
HTTP/1.1 404 Not Found
Server: nginx/1.18.0 (Ubuntu)
Date: Mon, 01 Nov 2021 07:45:23 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 66
Connection: keep-alive
content-security-policy: upgrade-insecure-requests
referrer-policy: strict-origin-when-cross-origin
x-frame-options: DENY
x-content-type-options: nosniff
x-xss-protection: 1; mode=block
vary: origin
access-control-expose-headers: WWW-Authenticate,Server-Authorization
cache-control: no-cache

{"message":"Pesanan gagal, kopi tidak ditemukan!","success":false}
```

---

# REST Web Service

**REST** atau **RE**presentational **S**tate **T**ransfer adalah salah satu gaya arsitektur yang dapat diadaptasi ketika membangun web service. Arsitektur ini sangat populer digunakan karena pengembanggannya yang relatif mudah, dengan menggunakan pola *request* - *response*.

Dalam implementasinya arsitektur **REST** benar-benar memisahkan peran client dan server, bahkan keduanya tidak harus saling mengetahui. Artinya ketika terjadi perubahan besar di sisi client, tidak akan berdampak pada sisi server, begitu juga sebaliknya.

## REST API

>API atau Application Program Interface merupakan antarmuka yang menjadi perantara antara sistem aplikasi yang berbeda. API tak hanya dalam bentuk Web Service, bisa saja berupa SDK (Software Development Kit) ataupun lainnya.

Berikut sifat yang menjadi kunci pada REST API 

- **Client-Server**, dalam penerapan REST API, Server harus bisa merespons *request* yang dilakukan client baik *response* yang diberikan berhasil atau gagal. Komunikasi antar client dan server yang terbentuk merupakan komunikasi yang dilakukan melalui protokol HTTP.
  
- **Stateless**, REST API tidak boleh menyimpan keadaan (*state*) apa pun terkait client. Seluruh state harus tetap disimpan di sisi client. Artinya, tidak ada session di REST API. Permintaan yang dilakukan client harus mengandung informasi yang jelas. Jangan berharap RESTful API akan menyimpan informasi dari permintaan sebelumnya untuk digunakan di permintaan selanjutnya.
  
- **Cacheable**, Agar dapat merespons permintaan dengan cepat, sebaiknya REST API menerapkan prinsip cache. Sehingga setiap permintaan tidak melulu mengambil dari database

- **Layered** : Ketika REST API server memiliki arsitektur yang kompleks, client seharusnya tidak perlu tahu bagaimana server melayaninya.

Empat poin yang harus diperhatikan ketika membangun REST API

### Format *Request* dan *Response*

Format data yang sering digunakan ketika melakukan *request* atau *response* pada REST API berupa JSON, 

>Sebenarnya Anda bisa menggunakan XML pada REST API, namun sebaiknya gunakan JSON agar lebih mudah dibaca dan efisien dalam transaksi data

Untuk memastikan REST API selalu merespons dengan format JSON pastikan setiap response terdapat properti **Content-Type** dengan nilai **application/json**.

### HTTP Verbs/Methods

**GET** untuk mendapatkan data, **POST** untuk mengirimkan data baru, **PUT** untuk memperbarui data yang ada, dan **DELETE** untuk menghapus data. Verbs tersebutlah yang umum digunakan dalam operasi **CRUD**.

### HTTP Response Code

Response code akan muncul pada setiap *response* yang dikembalikan, dimana code ini terdapat dalam status line yang mengindikasikan *request* berhasil atau tidak. Status code bernilai 3-digit angka, berikut nilai - nilai status code yang sering digunakan

-   **200** (OK) - Permintaan client berhasil dijalankan oleh server.
-   **201** (Created) - Server berhasil membuat/menambahkan resource yang diminta client.
-   **400** (Bad Request) - Permintaan client gagal dijalankan karena proses validasi input dari client gagal.
-   **401** (Unauthorized) - Permintaan client gagal dijalankan. Biasanya ini disebabkan karena pengguna belum melakukan proses autentikasi.
-   **403** (Forbidden) - Permintaan client gagal dijalankan karena ia tidak memiliki hak akses ke resource yang diminta.
-   **404** (Not Found) - Permintaan client gagal dijalankan karena resource yang diminta tidak ditemukan.
-   **500** (Internal Server Error) -  Permintaan client gagal dijalankan karena server mengalami eror (membangkitkan Exception).

### URL Design

URL, Path, atau Endpoint merupakan salah satu bagian terpenting yang harus diperhatikan ketikan membangun REST API. Dalam merancang endpoint, ikutilah aturan umum atau *convention* agar penggunaan API kita memiliki standar yang diharapkan oleh banyak developer, yaitu;

#### Gunakan Kata Benda daripada Kata Kerja pada Endpoint Path

Hindari penggunaan kata kerja dalam menetapkan nama endpoint (titik akhir path). Contohnya /getArticles atau /addArticles. Karena aksi dapat ditentukan secara jelas melalui HTTP Verb, kita tidak perlu lagi menambahkan kata kerja di endpoint. Dengan adanya HTTP verbs Anda cukup memberikan endpoint GET /articles untuk mendapatkan data artikel atau POST /articles untuk menambahkan artikel.

#### Gunakan Kata Jamak pada Endpoint untuk Resource Collection

Selalu gunakan kata jamak (plural) saat memberikan nama endpoint. Ini karena jarang ada data yang hanya memiliki satu item. Dengan menggunakan kata jamak, kita menjadi konsisten dengan apa yang ada di database. Karena tabel pada database pun biasanya memiliki lebih dari satu record (data).

Namun jika hanya ingin mengakses satu data saja Endpoint Path bisa dispesifikasikan dengan menggunakan path parameter untuk mendapatkan data spesifik. Endpoint /articles/:id merupakan contoh yang baik untuk mendapatkan artikel secara spesifik berdasarkan id. Kita akan membahas dan menggunakan path parameter nanti ketika latihan membuat web server.

#### Gunakan Endpoint berantai untuk resource yang memiliki hirarki/relasi

Endpoint dari resource yang memiliki hirarki/relasi sebaiknya dituliskan secara berantai. Contohnya untuk mendapatkan daftar komentar dari sebuah artikel, endpoint GET /articles/:id/comments merupakan contoh yang tepat.

Penggunaan endpoint tersebut masuk akal karena untuk mendapatkan comments pada respons, kita perlu tahu komentar pada artikel mana yang akan ditampilkan. Prinsip ini juga memperjelas permintaan dari client hanya dengan melihat endpoint yang dituju,  daripada menggunakan endpoint GET /comments kemudian memberikan nilai id artikel pada request body.

Tidak hanya GET, prinsip ini juga cocok diterapkan pada HTTP verb POST, PUT, maupun DELETE.