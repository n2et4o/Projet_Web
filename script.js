


document.addEventListener("DOMContentLoaded", function () {
        const heroCarousel = document.getElementById("heroCarousel");
        const events = [
          {
            date: "2025-05-17",
            title: "Atelier compostage",
            location: "Centre culturel, Paris",
            time: "14:00 - 16:00",
          },
          {
            date: "2025-05-22",
            title: "Conférence biodiversité",
            location: "Université Lyon 2",
            time: "18:30 - 20:30",
          },
          {
            date: "2025-05-25",
            title: "Nettoyage de plage",
            location: "Plage de Saint-Michel",
            time: "09:00 - 12:00",
          },
          {
            date: "2025-05-30",
            title: "Atelier recyclage créatif",
            location: "MJC Centrale",
            time: "15:00 - 17:00",
          },
        ];
        function updateUpcomingEvents() {
          const currentDate = new Date();
          const upcomingEventsContainer = document.getElementById("upcomingEvents");
          upcomingEventsContainer.innerHTML = "";
          const futureEvents = events
            .filter((event) => new Date(event.date) >= currentDate)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 3);
          if (futureEvents.length === 0) {
            upcomingEventsContainer.innerHTML = `
                  <div class="bg-white rounded-lg shadow-sm p-4 mb-4 text-center">
                      <p class="text-gray-600">Aucun événement à venir pour le moment</p>
                  </div>
              `;
            return;
          }
          futureEvents.forEach((event) => {
            const eventDate = new Date(event.date);
            const day = eventDate.getDate();
            const month = eventDate.toLocaleString("fr-FR", { month: "short" });
            const eventHtml = `
                  <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
                      <div class="flex items-center mb-3">
                          <div class="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex flex-col items-center justify-center mr-3">
                              <span class="text-primary font-medium">${day}</span>
                              <span class="text-primary text-xs">${month}</span>
                          </div>
                          <div>
                              <h3 class="font-medium text-sm">${event.title}</h3>
                              <p class="text-xs text-gray-600">${event.location}, ${event.time}</p>
                          </div>
                      </div>
                      <button class="bg-primary bg-opacity-10 text-primary text-xs font-medium py-1.5 px-3 !rounded-button cursor-pointer">
                          S'inscrire
                      </button>
                  </div>
              `;
            upcomingEventsContainer.innerHTML += eventHtml;
          });
        }
        updateUpcomingEvents();
        setInterval(updateUpcomingEvents, 3000);
        const images = heroCarousel.getElementsByTagName("img");
        let currentImageIndex = 0;
        function showNextImage() {
          images[currentImageIndex].classList.remove("opacity-60");
          images[currentImageIndex].classList.add("opacity-0");
          currentImageIndex = (currentImageIndex + 1) % images.length;
          images[currentImageIndex].classList.remove("opacity-0");
          images[currentImageIndex].classList.add("opacity-60");
        }
        setInterval(showNextImage, 30000);
        // Chart initialization
        const chartDom = document.getElementById("impactChart");
        const myChart = echarts.init(chartDom);
        const option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          legend: {
            data: ["Arbres plantés", "CO₂ économisé (tonnes)"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: ["Jan", "Fév", "Mar", "Avr", "Mai"],
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "Arbres plantés",
              type: "bar",
              stack: "Ad",
              emphasis: {
                focus: "series",
              },
              data: [1200, 1800, 2500, 3200, 3800],
              color: "#27ae60",
            },
            {
              name: "CO₂ économisé (tonnes)",
              type: "bar",
              stack: "Ad",
              emphasis: {
                focus: "series",
              },
              data: [320, 480, 650, 830, 950],
              color: "#3498db",
            },
          ],
        };
        myChart.setOption(option);
        // Resize chart when window is resized
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      });

    