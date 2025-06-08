// Assuming you expose 'electronAPI' in preload.js with fetchClients()
async function fetchClients() {
  try {
    const clients = await window.electronAPI.fetchClients();
    console.log(clients); // Correct variable logged

    // Then you can render clients to the UI, for example:
    // displayClients(clients);

  } catch (error) {
    console.error('Error fetching clients:', error);
  }
}

window.addEventListener('DOMContentLoaded', fetchClients);
