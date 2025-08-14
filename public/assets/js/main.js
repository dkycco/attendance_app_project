function convertWhatsappToHTML(text) {
  return text
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/\_\*\*(.+?)\*\*\_/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\_\*(.+?)\*\_/g, '<strong><em>$1</em></strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\_(.+?)\_/g, '<em>$1</em>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
}

function textFormating(str) {
   const lines = str.split('\n');
   const trimmedLines = lines.map(line => line.trimStart());
   return trimmedLines.join('\n').trim();
}

function formatNoHP(input) {
   const cleaned = input.value.replace(/[^0-9]/g, '');

   let formatted = '';
   if (!cleaned.startsWith('62')) {
      formatted = '62';
   } else {
      formatted = cleaned;
   }

   const rest = formatted.slice(2);

   let result = '+62';
   if (rest.length > 0) {
      result += ' ' + rest.slice(0, 3);
   }
   if (rest.length > 3) {
      result += '-' + rest.slice(3, 7);
   }
   if (rest.length > 7) {
      result += '-' + rest.slice(7, 11);
   }

   input.value = result;
}


function showToastify(message, type) {
   let bgColor = '';

   if (type === 'success') {
      bgColor = '#45CB85';
   } else if (type === 'danger') {
      bgColor = '#f06548';
   } else if (type === 'warning') {
      bgColor = '#ffbe0b';
   }

   Toastify({
      text: message,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      close: true,
      stopOnFocus: true,
      style: {
         background: bgColor,
         borderRadius: '8px',
         boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
         color: '#fff',
         fontSize: '14px',
      }
   }).showToast();
}