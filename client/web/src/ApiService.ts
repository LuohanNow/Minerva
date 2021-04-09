import { Document, DocumentWithoutId } from "./models/Document";

export class ApiService {

	GetAllDocuments(): Promise<Array<Document>> {
		return new Promise(resolve => {
			void (async () => {
				const response = await fetch('https://minerva-server-app.herokuapp.com/documents', {
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

	AddDocument(documentBody: DocumentWithoutId): Promise<Document> {
		const url = `https://minerva-server-app.herokuapp.com/document`;

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

