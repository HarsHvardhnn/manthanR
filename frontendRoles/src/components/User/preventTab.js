
export function preventTab(e) {
    if (e.key === "Tab") { 
      e.preventDefault();   
    }
  }
  
  export function addPreventTab() {
    document.addEventListener("keydown", preventTab);
  }
  
  export function removePreventTab() {
    document.removeEventListener("keydown", preventTab);
  }
  