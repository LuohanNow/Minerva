import { Document, DocumentWithoutId } from "./models/Document";
import { Tags } from "./models/Tags";

export class ApiService {

	GetAllTags(userId: string): Promise<Tags> {
		return new Promise(resolve => {
			void (async () => {
				const response = await fetch(`https://minerva-server-app.herokuapp.com/tags?userid=${userId}`, {
					method: 'GET',
					mode: "cors",
				});
				const tags = await response.json() as Promise<Tags>
				resolve(tags);
			})();
		});
	}

	SearchDocuments(userId: string, searchText: string): Promise<Array<Document>> {
		return new Promise(resolve => {
			void (async () => {
				const response = await fetch(`https://minerva-server-app.herokuapp.com/search?userid=${userId}`, {
					method: 'POST', 
					body: JSON.stringify({
						info: searchText
					}), 
					headers: {
						'Content-Type': 'application/json'
					}
				});
				
				try {
					const foundDocuments = await response.json() as Promise<Array<Document>>
					resolve(foundDocuments);
				} catch{
					resolve([]);
				}
			})();
		});
	}

	GetAllUserDocumentsByTag(userId: string, tag: string): Promise<Array<Document>> {
		return new Promise(resolve => {
			void (async () => {
				const response = await fetch(`https://minerva-server-app.herokuapp.com/documentsbytag?userid=${userId}&tag=${tag}`, {
					method: 'GET',
					mode: "cors",
				});
				const documents = await response.json() as Promise<Array<Document>>
				resolve(documents);
			})();
		});
	}

	GetAllUserDocuments(userId: string): Promise<Array<Document>> {
		return new Promise(resolve => {
			void (async () => {
				const response = await fetch(`https://minerva-server-app.herokuapp.com/documents?userid=${userId}`, {
					method: 'GET',
					mode: "cors",
				});
				const documents = await response.json() as Promise<Array<Document>>
				resolve(documents);
			})();
		});
	}

	UpdateDocumentById(id: string, documentBody: DocumentWithoutId): Promise<boolean> {
		const url = `https://minerva-server-app.herokuapp.com/document/${id}`;

		return new Promise(resolve => {
			void (async () => {
				const response = await fetch(url, {
					method: 'PUT', 
					body: JSON.stringify(documentBody), 
					headers: {
					  'Content-Type': 'application/json'
					}
				  });
				const isOk = await response.ok;
				resolve(isOk);
			})();
		});
	}

	DeleteDocumentById(id: string): Promise<boolean> {
		const url = `https://minerva-server-app.herokuapp.com/document/${id}`;

		return new Promise(resolve => {
			void (async () => {
				const response = await fetch(url, {
					method: 'DELETE', 
					headers: {
					  'Content-Type': 'application/json'
					}
				  });
				const isOk = await response.ok;
				resolve(isOk);
			})();
		});
	}

	AddDocument(userId: string, documentBody: DocumentWithoutId): Promise<Document> {
		const url = `https://minerva-server-app.herokuapp.com/document?userid=${userId}`;

		return new Promise(resolve => {
			void (async () => {
				const response = await fetch(url, {
					method: 'POST', 
					body: JSON.stringify(documentBody), 
					headers: {
					  'Content-Type': 'application/json'
					}
				  });

				const document = await response.json() as Promise<Document>;
				resolve(document);
			})();
		});
	}

}

