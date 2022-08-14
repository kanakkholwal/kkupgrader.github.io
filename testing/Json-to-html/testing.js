document.addEventListener('DOMContentLoaded', function() {

    const ToolsList = document.getElementById('tool-list');

    function CreateToolsSections(SectionName, SectionDescription) {
        var section = document.createElement('div');
        section.id = SectionName.replaceAll(" ", "_");

        var SectionTitle = document.createElement('div');
        SectionTitle.classList.add('section-title');
        var SectionHeading = document.createElement('h2');
        SectionHeading.title = SectionName;
        SectionHeading.innerText = SectionName;
        SectionTitle.appendChild(SectionHeading);

        var Description = document.createElement('div');
        Description.classList.add('section-description');
        var DescriptionPara = document.createElement('p');
        DescriptionPara.innerHTML = SectionDescription;
        Description.appendChild(DescriptionPara);
        var Content = document.createElement('div');
        Content.className = "row g-3";
        Content.id = section.id + "_content";

        section.appendChild(SectionTitle);
        section.appendChild(Description);
        section.appendChild(Content);
        ToolsList.appendChild(section);
    }

    function createToolCell(Container, Name, imageSrc, Directory, Description) {
        var parentContainer = document.getElementById(Container);

        var cell = document.createElement('div');
        cell.className = 'col-sm-6 col-md-5 col-lg-4';

        var cellCard = document.createElement('div');
        cellCard.className = 'card m-auto';

        var CardBody = document.createElement('div');
        CardBody.className = 'card-body text-center';

        var CardImage = document.createElement('img');
        CardImage.src = imageSrc;
        CardImage.className = 'img-fluid rounded';

        var CardTitle = document.createElement('h4');
        CardTitle.innerText = Name;

        var CardDescription = document.createElement('p');
        CardDescription.innerHTML = Description;

        var ctaBtn = document.createElement('a');
        ctaBtn.href = Directory;
        ctaBtn.innerText = "Use This Tool";
        ctaBtn.target = "_blank";
        ctaBtn.className = 'btn btn-primary btn-rounded';

        CardBody.appendChild(CardImage);
        CardBody.appendChild(CardTitle);
        CardBody.appendChild(CardDescription);
        CardBody.appendChild(ctaBtn);
        cellCard.appendChild(CardBody);
        cell.appendChild(cellCard);

        parentContainer.appendChild(cell);




    }

    (function() {
        var http = new XMLHttpRequest();
        http.open("GET", "testing.json", true);
        http.send();
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                    // console.log(this.responseText);
                    var SearchJson = JSON.parse(this.responseText);
                    // console.log(SearchJson);
                    for (var i = 0; i < SearchJson.length; ++i) {

                        CreateToolsSections(SearchJson[i].ToolType, SearchJson[i].ToolDescription);

                        for (var j = 0; j < SearchJson[i].ToolsCells.length; ++j) {
                            var parentSection = SearchJson[i].ToolType.replaceAll(" ", "_") + "_content";
                            console.log(SearchJson[i].ToolsCells);
                            createToolCell(parentSection, SearchJson[i].ToolsCells[j].Name, SearchJson[i].ToolsCells[j].imageSrc, SearchJson[i].ToolsCells[j].Directory, SearchJson[i].ToolsCells[j].description);
                        }

                    }

                
            }
        };
    })();
});


// fromAPi();