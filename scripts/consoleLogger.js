document.addEventListener('DOMContentLoaded', function () {

    document.addEventListener('formValid', function (event) {
      const formData = event.detail;
  
      console.clear();
  
      console.log('  Новое сообщение с формы   ');
      console.log('ФИО:        ', formData.fullname);
      console.log('Телефон:    ', formData.phone);
      console.log('Email:      ', formData.email);
      console.log('Тема:       ', formData.subject);
      console.log('Сообщение:  ', formData.message);
      console.log('───────────────────────────────');
      console.log('Время отправки:', new Date().toLocaleString('ru-RU'));
      console.log('═══════════════════════════════');
    });
  
  });