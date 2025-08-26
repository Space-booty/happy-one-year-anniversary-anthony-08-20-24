let currentPage = 0;
        const totalPages = 9;
        const pages = document.querySelectorAll('.page');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const pageIndicator = document.getElementById('page-indicator');

        // Generate August 2024 calendar
        function generateCalendar() {
            const calendarGrid = document.getElementById('calendar-grid');
            const daysInAugust = 31;
            const startDay = 4; // August 1, 2024 was a Thursday (0=Sunday, 4=Thursday)
            
            // Add empty cells for days before August 1st
            for (let i = 0; i < startDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day';
                calendarGrid.appendChild(emptyDay);
            }
            
            // Add days of the month
            for (let day = 1; day <= daysInAugust; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;
                
                // Mark August 20th as special
                if (day === 20) {
                    dayElement.classList.add('special');
                }
                
                calendarGrid.appendChild(dayElement);
            }
        }

        function updatePage() {
            pages.forEach((page, index) => {
                page.style.display = 'block';
                page.classList.remove('flipped', 'hidden');
                const pageNumber = parseInt(page.getAttribute('data-page'));
                
                if (pageNumber < currentPage) {
                    page.classList.add('hidden');
                } else if (pageNumber === currentPage) {
                    // Current page - visible
                } else {
                    page.style.display = 'none';
                }
            });
            
            // Update navigation buttons
            prevBtn.disabled = currentPage === 0;
            nextBtn.disabled = currentPage === totalPages - 1;
            
            // Update page indicator
            pageIndicator.textContent = `Page ${currentPage + 1} of ${totalPages}`;
        }

        function nextPage() {
            if (currentPage < totalPages - 1) {
                pages[currentPage].classList.add('flipped');
                setTimeout(() => {
                    currentPage++;
                    updatePage();
                }, 400);
            }
        }

        function previousPage() {
            if (currentPage > 0) {
                currentPage--;
                pages[currentPage].classList.remove('hidden');
                pages[currentPage].style.display = 'block';
                setTimeout(() => {
                    pages[currentPage].classList.remove('flipped');
                    updatePage();
                }, 50);
            }
        }

        // Event listeners
        nextBtn.addEventListener('click', nextPage);
        prevBtn.addEventListener('click', previousPage);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                nextPage();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                previousPage();
            }
        });

        // Initialize
        generateCalendar();
        updatePage();