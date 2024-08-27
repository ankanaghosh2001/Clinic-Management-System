document.getElementById('search').addEventListener('click', function() {
    const lDate = document.getElementById('lDate').value;
    const uDate = document.getElementById('uDate').value;

    console.log(lDate);
    console.log(uDate);

    if (!lDate || !uDate) {
        alert('Please enter both lower and upper date limits.');
        return;
    }

    const params = new URLSearchParams({
        date1: lDate,
        date2: uDate,
    });
    const queryString = params.toString();

    fetch(`/report?${queryString}`)
        .then(response => {
            if (response.status === 404) {
                throw new Error('No patient record found within this interval');
            }
            return response.json();
        })
        .then(data => {
            displayRecords(data);
        })
        .catch(error => {
            console.error('Error fetching report 1:', error);
            alert(error.message);
        });
});

function displayRecords(records) {
    const recordContainer = document.getElementById('records');
    recordContainer.innerHTML = '';
    
    if (records.length === 0) {
        recordContainer.innerHTML = '<p>No record found.</p>';
        return;
    }

    const recordMap = new Map();

    records.forEach(record => {
        const VisitDate = record.VisitDate;

    
        if (!recordMap.has(VisitDate)) {
            recordMap.set(VisitDate, {
                Pname : [],
                Dname : [],
                Dtype : [],
                Pmode : [],
                Test : []
                
            });
        }

    
        if (record.Pname && !recordMap.get(VisitDate).Pname.includes(record.Pname)) {
            recordMap.get(VisitDate).Pname.push(record.Pname);
        }
        if (record.Dname && !recordMap.get(VisitDate).Dname.includes(record.Dname)) {
            recordMap.get(VisitDate).Dname.push(record.Dname);
        }
        if (record.Dtype && !recordMap.get(VisitDate).Dtype.includes(record.Dtype)) {
            recordMap.get(VisitDate).Dtype.push(record.Dtype);
        }
        if (record.Pmode && !recordMap.get(VisitDate).Pmode.includes(record.Pmode)) {
            recordMap.get(VisitDate).Pmode.push(record.Pmode);
        }
        if (record.Test && !recordMap.get(VisitDate).Test.includes(record.Test)) {
            recordMap.get(VisitDate).Test.push(record.Test);
        }
        
    });

    // Clear movies container
    recordContainer.innerHTML = '';

    
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered');
    
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Visit Date</th>
        <th>Patient name</th>
        <th>Doctor Name</th>
        <th>Visiting / In House</th>
        <th>Payment Mode</th>
        <th>Tests Suggested</th>
        
    `;
    table.appendChild(headerRow);

    // Iterate through movieMap to display movies
    recordMap.forEach((data, VisitDate) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${VisitDate}</td>
            <td>${records.find(record => record.VisitDate === VisitDate).Pname}</td>
            <td>${data.Dname.join(', ')}</td>
            <td>${records.find(record => record.VisitDate === VisitDate).Dtype}</td>
            <td>${records.find(record => record.VisitDate === VisitDate).Pmode}</td>
            <td>${records.find(record => record.VisitDate === VisitDate).Test}</td>

        `;
        table.appendChild(row);
    });


    recordContainer.appendChild(table);
}
