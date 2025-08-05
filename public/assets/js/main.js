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

function getChartColorsArray(t) {
   if (null !== document.getElementById(t)) {
      t = document.getElementById(t).getAttribute("data-colors");
      if (t) return (t = JSON.parse(t)).map(function (t) {
         var e = t.replace(" ", "");
         return -1 === e.indexOf(",") ? getComputedStyle(document.documentElement).getPropertyValue(e) || e : 2 == (t = t.split(",")).length ? "rgba(" + getComputedStyle(document.documentElement).getPropertyValue(t[0]) + "," + t[1] + ")" : e
      })
   }
}

var chartColumnColors = getChartColorsArray("column_chart"),
   chartColumnDatatalabelColors = (chartColumnColors && (options = {
      chart: {
         height: 350,
         type: "bar",
         toolbar: {
            show: 1
         }
      },
      plotOptions: {
         bar: {
            horizontal: !1,
            columnWidth: '60%',
            borderRadius: 5,
            borderRadiusApplication: 'end',
            dataLabels: {
               position: 'top',
            },
         }
      },
      dataLabels: {
         enabled: 1,
         offsetY: -20,
         style: {
            fontSize: '12px',
            colors: ["#878a99"]
         }
      },
      stroke: {
         show: !0,
         width: 1,
         colors: ["transparent"]
      },
      series: [{
         name: "Hadir Tepat Waktu",
         data: [46, 57, 59, 54, 62, 58, 64, 60, 66, 23, 24, 23]
      }, {
         name: "Telat",
         data: [74, 83, 102, 97, 86, 106, 93, 114, 94, 54, 62, 58]
      }, {
         name: "Absen",
         data: [37, 42, 38, 26, 47, 50, 54, 55, 43, 83, 102, 97]
      }],
      colors: chartColumnColors,
      xaxis: {
         categories: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
      },
      yaxis: {
         title: {
            text: "Jumlah siswa"
         }
      },
      grid: {
         borderColor: "#f1f1f1"
      },
      fill: {
         opacity: 1
      },
      tooltip: {
         y: {
            formatter: function (t) {
               return t + " siswa"
            }
         }
      }
   }, (chart = new ApexCharts(document.querySelector("#column_chart"), options)).render()));