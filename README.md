# Stock Project
 try {
    const result = await window.electronAPI.addClient({ name, Number });

    if (result.success) {
      showToast('تمت إضافة العميل بنجاح!',5000);
      form.reset();
      modal.classList.add('hidden');
      // Optionally refresh client list here
    }
  } catch (err) {
    alert('Erreur lors de l\'ajout du client : ' + err);
  }