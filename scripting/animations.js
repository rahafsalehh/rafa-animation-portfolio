// Wait for the DOM to load - SINGLE event listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - starting script');
    
    // Get all elements we need
    const viewProjectButtons = document.querySelectorAll('.viewProject');
    const portGrid = document.querySelector('.portfolio-grid');
    const existingDisplayDiv = document.querySelector('.selected-project-view');
    
    console.log('Found', viewProjectButtons.length, 'viewProject buttons');
    
    // Add click event to each viewProject button
    viewProjectButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            console.log('Button clicked:', index);
            
            // Get the parent portfolio item
            const portfolioItem = this.closest('.portfolio-item');
            
            // Get the image, title, and description from the portfolio item
            const image = portfolioItem.querySelector('.portfolio-image');
            const title = portfolioItem.querySelector('.portfolio-title');
            const description = portfolioItem.querySelector('.portfolio-description');
            
            console.log('Image source:', image.src);
            console.log('Title:', title.textContent);
            
            // Hide portfolio grid
            if (portGrid) {
                portGrid.style.display = 'none';
            }
            
            // Call function to display the selected project
            displaySelectedProject(image.src, title.textContent, description.textContent, image.alt);
        });
    });

    // Function to display the selected project
    function displaySelectedProject(imageSrc, title, description, altText) {
        console.log('displaySelectedProject called with:', imageSrc);
        
        // Get or create the display div
        let displayDiv = document.querySelector('.selected-project-view');
        
        // Initialize displayDiv if it doesn't exist (for fallback)
        if (!displayDiv) {
            console.log('Creating display div');
            createDisplayDiv();
            displayDiv = document.querySelector('.selected-project-view');
        }
        
        // Make sure displayDiv exists
        if (!displayDiv) {
            console.error('Display div not found!');
            return;
        }
        
        // Set the content based on which project was clicked
        const selectedImage = document.getElementById('selected-image');
        const selectedTitle = document.getElementById('selected-title');
        const selectedDescription = document.getElementById('selected-description');
        
        if (selectedImage) {
            selectedImage.src = imageSrc;
            selectedImage.alt = altText;
        }
        
        if (selectedTitle) {
            selectedTitle.textContent = title;
        }
        
        if (selectedDescription) {
            selectedDescription.textContent = description;
        }
        
        // Show the display div
        console.log('Setting display to flex');
        displayDiv.style.display = 'flex';
        displayDiv.classList.add('active');
    }
    
    // Function to create the display div if it doesn't exist in HTML
    function createDisplayDiv() {
        const displayDiv = document.createElement('div');
        displayDiv.className = 'selected-project-view';
        
        // Create container
        const container = document.createElement('div');
        container.className = 'selected-project-container';
        
        // Create image container
        const imageDiv = document.createElement('div');
        imageDiv.className = 'selected-project-image';
        
        const img = document.createElement('img');
        img.id = 'selected-image';
        
        // Create info container
        const infoDiv = document.createElement('div');
        infoDiv.className = 'selected-project-info';
        
        const h2 = document.createElement('h2');
        h2.id = 'selected-title';
        
        const p = document.createElement('p');
        p.id = 'selected-description';
        
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-view';
        closeBtn.textContent = '← Back to Portfolio';
        
        // Assemble the elements
        imageDiv.appendChild(img);
        infoDiv.appendChild(h2);
        infoDiv.appendChild(p);
        infoDiv.appendChild(closeBtn);
        container.appendChild(imageDiv);
        container.appendChild(infoDiv);
        displayDiv.appendChild(container);
        document.body.appendChild(displayDiv);
        
        // Add close functionality - THIS IS THE FIX!
        closeBtn.addEventListener('click', function() {
            // Hide the project view
            displayDiv.style.display = 'none';
            displayDiv.classList.remove('active');
            
            // Show the portfolio grid again
            const portGrid = document.querySelector('.portfolio-grid');
            if (portGrid) {
                portGrid.style.display = 'grid'; // or 'flex' depending on your CSS
            }
        });
        
        // Close when clicking outside the container
        displayDiv.addEventListener('click', function(e) {
            if (e.target === displayDiv) {
                // Hide the project view
                displayDiv.style.display = 'none';
                displayDiv.classList.remove('active');
                
                // Show the portfolio grid again
                const portGrid = document.querySelector('.portfolio-grid');
                if (portGrid) {
                    portGrid.style.display = 'grid';
                }
            }
        });
    }
    
    // Initialize the display div to be hidden
    function initializeDisplayDiv() {
        const displayDiv = document.querySelector('.selected-project-view');
        if (displayDiv) {
            displayDiv.style.display = 'none';
            
            // Also add event listener for close button if it already exists in HTML
            const closeBtn = displayDiv.querySelector('.close-view');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    displayDiv.style.display = 'none';
                    displayDiv.classList.remove('active');
                    
                    // Show portfolio grid
                    const portGrid = document.querySelector('.portfolio-grid');
                    if (portGrid) {
                        portGrid.style.display = 'grid';
                    }
                });
            }
        }
    }
    
    // Call initialization
    initializeDisplayDiv();
    console.log('Initialization complete');
});