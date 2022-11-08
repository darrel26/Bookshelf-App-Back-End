### Ketentuan Berkas Submission

-   Berkas submission yang dikirim merupakan folder proyek dari Bookshelf API dalam bentuk **ZIP**. 
-   Pastikan di dalam folder proyek yang Anda kirim terdapat berkas **package.json**.
-   Pastikan Anda hapus dulu berkas **node_modules** pada folder proyek sebelum mengkompresi dalam bentuk **ZIP**.  

### Project To Do List

- [X] **API can save books**
	
	- Method : **POST**
	- URL : **/books**
	- Body Request :
	
	```json
	{
		"name": string,
		"year": number,
		"author": string,
		"summary": string,
		"publisher": string,
		"pageCount": number,
		"readPage": number,
		"reading": boolean
	}
	```
	
	Saved on server side :
	
	```json
	{
		"id": "Qbax5Oy7L8WKf74l",
		"name": "Buku A",
		"year": 2010,
		"author": "John Doe",
		"summary": "Lorem ipsum dolor sit amet",
		"publisher": "Dicoding Indonesia",
		"pageCount": 100,
		"readPage": 25,
		"finished": false,
		"reading": false,
		"insertedAt": "2021-03-04T09:11:44.598Z",
	    "updatedAt": "2021-03-04T09:11:44.598Z"
	}
	```
	
	Property details :
	- **id** : must be unique, you can use *nanoid* libraries
	- **finished** : is a boolean to define status wheter book is read or not, and the value is get from *pageCount === readPage*
	- **insertedAt** : is a property that holds the date the book was entered, can use *new Date().toISOString()*
	- **updatedAt** : is a property that holds the date the book was updated, can use the same value as *insertedAt*
	
	Server must give **failed** response if :
	- The client does not attach the name property to the request body. When this happens, the server will respond with:
		- Status Code : **400**
		- Response Body :
		
		```json
		{
			"status": "fail",
			"message": "Gagal menambahkan buku. Mohon isi nama buku"
		}
		```
	
	- The client attaches the value of the **readPage** property which is greater than the value of the **pageCount** property. When this happens, the server responds with:
		- Status Code : **400**
		- Response Body :
		
		```json
		{
			"status": "fail",
			"message": "Gagal menambahkan buku. readPage tidak boleh lebih 
                       besar dari pageCount"
		}
		```
	
	- The server failed to load the book for a common reason (generic error). When this happens, the server responds with:
		- Status Code : 500
		- Response Body :
		
	```json
		{
			"status": "error",
			"message": "Buku gagal ditambahkan"
		}
	```
	
	- When the book is entered successfully, the server should return a response with:
		- Status Code : 201
		- Response Body :
		
		```json
		{
			"status": "success",
			"message": "Buku berhasil ditambahkan",
				"data": {
					"bookId": "1L7ZtDUFeGs7VlEt"
				}
		}
		```
	
- [X] **API can retrieve and display all books**
	
	- Method : **GET**
	- URL : **/books**
	
	Server should send response with:
	
	- Status Code : 200
	- Response Body : 
	
	```json
	{
	    "status": "success",
	    "data": {
	        "books": [
	            {
	                "id": "Qbax5Oy7L8WKf74l",
	                "name": "Buku A",
	                "publisher": "Dicoding Indonesia"
	            },
	            {
	                "id": "1L7ZtDUFeGs7VlEt",
	                "name": "Buku B",
	                "publisher": "Dicoding Indonesia"
	            },
	            {
	                "id": "K8DZbfI-t3LrY7lD",
	                "name": "Buku C",
	                "publisher": "Dicoding Indonesia"
	            }
	        ]
	    }
	}
	```
	
	*If no books have been entered, the server can respond with an empty books array.*
	
- [ ] **API can show book details**
	
	- Method : **GET**
	- URL : **/books/{booksId}**
	
	- If the book with the id attached by the client is not found, then the server should return a response with:
		- Status Code : 404
		- Response Body :
		
		```json
		{
		    "status": "fail",
		    "message": "Buku tidak ditemukan"
		}
		```
	- When a book with an attached id is found, then the server should return a response with:
		- Status Code : 200
		- Response Body :
		
		```json
		{
		    "status": "success",
		    "data": {
		        "book": {
		            "id": "aWZBUW3JN_VBE-9I",
		            "name": "Buku A Revisi",
		            "year": 2011,
		            "author": "Jane Doe",
		            "summary": "Lorem Dolor sit Amet",
		            "publisher": "Dicoding",
		            "pageCount": 200,
		            "readPage": 26,
		            "finished": false,
		            "reading": false,
		            "insertedAt": "2021-03-05T06:14:28.930Z",
		            "updatedAt": "2021-03-05T06:14:30.718Z"
		        }
		    }
		}
		```
	
- [ ] **API can edit book data**
	
	- Method : **PUT**
	- URL : **/books/{bookId}**
	- Body Request :
	
	```json
	{
	    "name": string,
	    "year": number,
	    "author": string,
	    "summary": string,
	    "publisher": string,
	    "pageCount": number,
	    "readPage": number,
	    "reading": boolean
	}
	```
	
	Server must give **failed** response if :
	- The client does not attach the name property to the request body. When this happens, the server responds with:
		-   Status Code : **400**
		-   Response Body :
		
		```json
		{
		    "status": "fail",
		    "message": "Gagal memperbarui buku. Mohon isi nama buku"
		}
		```
		
	- The client attaches the value of the **readPage** property which is greater than the value of the **pageCount** property. When this happens, the server responds with:
		- Status Code : 400
		- Response Body :
		
		```json
		{
		    "status": "fail",
		    "message": "Gagal memperbarui buku. readPage tidak boleh lebih 
                        besar dari pageCount"
		}
		```
		
	- The **id** attached by the client was not found by the server. When this happens, the server responds with:
		- Status Code : 404
		- Response Body :
		```json
		{
		    "status": "fail",
		    "message": "Gagal memperbarui buku. Id tidak ditemukan"
		}
		```
		
	When the book is updated successfully, the server should return a response with:
	- Status Code : 200
	- Response Body :
	
	```json
	{
	    "status": "success",
	    "message": "Buku berhasil diperbarui"
	}
	```
	
- [ ] **API can delete book**
	
	- Method : **DELETE**
	- URL : **/books/{bookId}**
	
	If the attached id is not owned by any book, then the server should return the following response :
	- Status Code : 404
	- Response Body :
	
	```json
	{
	    "status": "fail",
	    "message": "Buku gagal dihapus. Id tidak ditemukan"
	}
	```
	
	If the id belongs to one of the books, then the book should be deleted and the server returns the following response :
	- Status Code : 200
	- Response Body : 
	
	```json
	{
	    "status": "success",
	    "message": "Buku berhasil dihapus"
	}
	```
