import { 
  Button, createMuiTheme, Fab, Grid, TextField, ThemeProvider } 
from '@material-ui/core';
import { ApiService } from './ApiService';
import { MarkdownEditor } from './components/MarkdownEditor/MarkdownEditor';
import { Document } from './models/Document';
import {Add, Save } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import "./App.scss";
import { green } from '@material-ui/core/colors';
import { t } from './localization';
import { AppToolbar } from './components/AppToolbar/AppToolbar';
import { ListDocuments } from './components/ListDocuments/ListDocuments';
import { ResultPanel } from './components/ResultPanel/ResultPanel';
import { AuthModal } from './components/AuthModal/AuthModal';
import { User } from './models/User';
import background from './images/background.jpg' // relative path to image 

const theme = createMuiTheme({
  typography: {
    fontSize: 16,
    fontFamily: [
      `"Roboto", "Helvetica", "Arial", sans-serif`,
    ].join(','),
    fontWeightRegular: 400,
},
  palette: {
    primary: green,
  },
});

const emptyDocument: Document = {
  body: " ",
  created: new Date().toString(),
  docHistory: " ",
  lastEditBy: " ",
  lastEditedBy: " ",
  markup: " ",
  subtitle: " ",
  tags: [],
  title: " ",
  updated: new Date().toString(),
  url: " ",
  _id: ""
}

function App() {
  const markdownEditor = useRef<MarkdownEditor>(null);
  const [documents, setDocuments] = useState<Array<Document>>([]);
  const [findedDocuments, setFindedDocuments] = useState<Array<Document>>([]);
  const [tags, setTags] = useState<Array<string>>([]);
  const [user, setUser] = useState<User>();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(true);
  const [editingDocument, setEditingDocument] = useState<Document>(emptyDocument);

  const users:Array<User> = [
    {
      id: "607946f2381b9030b41eecdb",
      name: "Лелюх Николай Николаевич"
    },
    {
      id: "60793c2d9e95560b283ca765",
      name: "Мохов Михаил Сергеевич"
    }
  ];

  /**
   * Load all documents on mount component
   */
  useEffect(() => {
    if(user){
      const apiService = new ApiService(); 
      void (async () => {
        const documentList = await apiService.GetAllUserDocuments(user.id)
        setDocuments(documentList);

        const tagsList = await apiService.GetAllTags(user.id)
        setTags(tagsList.tags);
      })();
    }
  }, [user]); 

  /**
   * Load document to markdown editor 
   * when editingDocument change
   */
  useEffect(() => {
    try {
      markdownEditor.current?.vditor.setValue(editingDocument.body);
    } catch (error) {}
  }, [editingDocument._id]); 

  function saveDocument(): void {
    const apiService = new ApiService();

    editingDocument.body = markdownEditor.current?.vditor.getValue(); 
    editingDocument.updated = new Date().toString(); 

    const { ["_id"]: id, ...savingDocument } = editingDocument;

    // if id define then update document
    // else add new
    if (id) {
      void (async () => {
      const isDocumentUpdated = await apiService.UpdateDocumentById(id, savingDocument);
      
      if(isDocumentUpdated) {
        let updatedDocument = documents.find(document => document._id === id);

        if (updatedDocument) {
          updatedDocument.body = savingDocument.body;
          updatedDocument.created = savingDocument.created;
          updatedDocument.docHistory = savingDocument.docHistory;
          updatedDocument.lastEditBy = savingDocument.lastEditBy;
          updatedDocument.lastEditedBy = savingDocument.lastEditedBy;
          updatedDocument.markup = savingDocument.markup;
          updatedDocument.subtitle = savingDocument.subtitle;
          updatedDocument.tags = savingDocument.tags;
          updatedDocument.title = savingDocument.title;
          updatedDocument.updated = savingDocument.updated;
          updatedDocument.url = savingDocument.url;
          setDocuments([...documents]);
        }
      }
      })();
    }
    else {
      if(user) {
        void (async () => {
          const result = await apiService.AddDocument(user.id, savingDocument)
          setDocuments([...documents, result]);
        })();
      }
    }
  }

  /**
   * Delete document
   * @param event 
   * @param index 
   */
  const deleteDocument = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    const idDocument = documents[index]._id;
    const apiService = new ApiService();

    void (async () => {
      apiService.DeleteDocumentById(idDocument)
      .then(isOk => {
        if(isOk) {
          setDocuments(documents.filter(item => item !== documents[index]));
        }
      }); 
    })();
  };

  function handleChangeTitle(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
    setEditingDocument({...editingDocument, title: e.target.value});
  }

  function onUserItemClick(userAuth: User): void {
    setUser(userAuth);
    setIsAuthModalOpen(false);
  }
  
  function onUserIconClick(): void {
    setUser(undefined);
    setIsAuthModalOpen(true);
  }

  function onDocumentItemClick(id: string): void {
    setEditingDocument(documents.filter(item => item._id === id)[0]);
  };
  
  function createNewDocument(): void {
    setEditingDocument(emptyDocument);
  };
 
  function onSearch(textSearch: string): void {
    const apiService = new ApiService();

    if(user) { 
        void (async () => {
        apiService.SearchDocuments(user.id, textSearch)
        .then(result => {
            setFindedDocuments(result);
        }); 
      })();
    }
  };

  function onTagItemClick (tag: string): void {
    const apiService = new ApiService();

    if(user) { 
        void (async () => {
        apiService.GetAllUserDocumentsByTag(user.id, tag)
        .then(result => {
            setFindedDocuments(result);
        }); 
      })();
    }
  };

  return (
    <div className="App">
      <AuthModal isOpen={isAuthModalOpen} users={users} onUserItemClick={onUserItemClick} />
      {user ?
        <ThemeProvider theme={theme}>
          <Grid container>
            <Grid item xs={12}>
              <AppToolbar userName={user?.name} onUserIconClick={onUserIconClick}/>
            </Grid>
            <Grid item xs={3}>
              <ListDocuments 
                tagsItems={tags}
                documentItems={documents}
                onTagItemClick={onTagItemClick}
                onDocumentItemClick={onDocumentItemClick} />
            </Grid>
            <Grid item xs={3}>
              <ResultPanel onResultItemClick={onDocumentItemClick} 
                onSearch={onSearch}
                documentItems={findedDocuments}/>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid className="document-title" item xs={9}>
                  <TextField onChange={handleChangeTitle} 
                      value={editingDocument.title} 
                      label= {t("document-title")}
                      variant="outlined" 
                      fullWidth
                  />
                </Grid>
                <Grid className="btn-save" item xs={3}>
                  <Button variant="contained" 
                    color="primary"
                    startIcon={<Save />}
                    onClick={saveDocument}
                  >
                      {t("save")}
                  </Button>
                </Grid>
              </Grid>
              <Grid className="markdown-editor" item xs={12}>
                <MarkdownEditor ref={markdownEditor}/>
              </Grid>
            </Grid>
          </Grid>
          <div className="fab">
            <Fab
              color="primary"
              className="fab-add"
              onClick={createNewDocument}
            >
              <Add/>
            </Fab>
          </div>
        </ThemeProvider>
        :
       <React.Fragment>
        <img src={background}/>
       </React.Fragment>
      }
    </div>
  );
}

export default App;
