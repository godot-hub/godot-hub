// render import project progress element
const renderImportProjectProgress = (importProjectBody) => {
  while (importProjectBody.firstChild) {
    importProjectBody.removeChild(importProjectBody.firstChild);
  }

  const importingElement = document.createElement('p');
  importingElement.setAttribute('id', 'importing');
  const importingElementText = document.createTextNode('Importing ...');
  importingElement.appendChild(importingElementText);
  importProjectBody.appendChild(importingElement);
};

module.exports = renderImportProjectProgress;
