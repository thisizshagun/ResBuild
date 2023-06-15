let modified = false;

let draggingElement = null;

function handleDragStart(event) {
  draggingElement = event.currentTarget;
  draggingElement.classList.add("dragging");
}

function handleDragOver(event) {
    event.preventDefault();
    const sectionsList = document.getElementById("sections");
    const afterElement = getDragAfterElement(sectionsList, event.clientY);
    const currentElement = document.querySelector(".dragging");
    if (afterElement == null) {
      sectionsList.appendChild(currentElement);
    } else {
      sectionsList.insertBefore(currentElement, afterElement);
    }
  }
  function handleDragEnd(event) {
    draggingElement.classList.remove("dragging");
    draggingElement = null;
  }
  function getDragAfterElement(sectionsList, y) {
    const draggableElements = [...sectionsList.querySelectorAll(".section:not(.dragging)")];

    return draggableElements.reduce(
      (closest, section) => {
        const box = section.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: section };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

    function editSectionName(sectionId) {
      const newName = prompt('Enter new section name');
      if (newName !== null && newName.trim() !== '') {
        const sectionNameElement = document.getElementById(sectionId + "Name");
        if (sectionNameElement) {
          sectionNameElement.textContent = newName;
          modified = true;
          enableSaveButton();
        }
      }
    }

    
    function toggleSection(sectionId) {
        modified = true;
        enableSaveButton();
      }

      function saveChanges() {
        if (modified) {
          // Perform save operation with the updated sections
          alert('Changes saved.');
          modified = false;
          disableSaveButton();
        }
      }
      function showDescription(sectionId) {
        const sectionDescriptionElement = document.getElementById(`${sectionId}Description`);
        if (sectionDescriptionElement) {
          const description = sectionDescriptionElement.textContent;
          alert(description);
        }
      }
  
      function enableSaveButton() {
        const saveButton = document.getElementById('saveButton');
        if (saveButton) {
          saveButton.disabled = false;
        }
      }
      function disableSaveButton() {
        const saveButton = document.getElementById('saveButton');
        if (saveButton) {
          saveButton.disabled = true;
        }
      }    

    