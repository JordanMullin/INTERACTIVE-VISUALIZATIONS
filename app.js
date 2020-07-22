// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument

let maindata;

d3.json("../data/samples.json").then((importedData) => {
    // console.log(importedData);

    maindata = importedData;
    let sampledata = importedData.samples;
    let dropdown = document.getElementById('selDataset');

for(i = 0 ; i< sampledata.length; i++){

      option = document.createElement('option');
      option.text = importedData.samples[i].id;
      option.value = importedData.samples[i].id;
      dropdown.add(option);
}
    
    let data = importedData.samples[0].otu_ids;
    let samp  = importedData.samples[0].sample_values;
    let label = importedData.samples[0].otu_labels;
  
    //Sort the data array using the greekSearchResults value
      data.sort(function(a, b) {
        return parseFloat(b.otu_ids) - parseFloat(a.otu_ids);
     });

      //Sort the samp array using the greekSearchResults value
      samp.sort(function(a, b) {
        return parseFloat(b.otu_ids) - parseFloat(a.otu_ids);
     });

     //Sort the samp array using the greekSearchResults value
         label.sort(function(a, b) {
            return parseFloat(b.otu_ids) - parseFloat(a.otu_ids);
         });

    // Slice the first 10 objects for plotting
      data = data.slice(0, 10);

      // Slice the first 10 objects for plotting
      samp = samp.slice(0, 10);label

       // Slice the first 10 objects for plotting
       label = label.slice(0, 10);

    // Reverse the array due to Plotly's defaults
      data = data.reverse();

   // Reverse the array due to Plotly's defaults
      samp = samp.reverse();

      // Reverse the array due to Plotly's defaults
      label = label.reverse();


      let data2 = data.map(data => { return `OTU ${data}`});
  
     // Trace1 for the Greek Data
    let trace1 = {
      x: samp,
      y: data2,
      text: label,
       type: "bar",
      orientation: "h"
    };
  
    // data` as the values for the bar chart.
     let chartData = [trace1];
  
    // Apply the group bar mode to the layout
     let layout = {
       margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
               }
        };
  
    // Render the plot to the div tag with id "plot"
      Plotly.newPlot("bar", chartData, layout);
      buildMetadata(maindata.samples[0].id);

//Bubble Graph

let bubbleLayout = {
    margin: { t: 0 },
    hovermode: "closests",
    xaxis: { title: "OTU ID"}
  }

  let bubbleData = [
    {
      x: data,
      y: samp,
      text: label,
      mode: "markers",
      marker: {
        size: samp,
        color: data,
        colorscale: "Earth"
      }
    }
  ]

  Plotly.plot("bubble", bubbleData, bubbleLayout);

  });

function optionChanged(selectedvalue){

    let data;
    let samp;
    let otu_labels;
    
    let sampledata = maindata.samples;

    for(i = 0 ; i < 153 ;i++){

        if(sampledata[i].id ==  selectedvalue){

            data = maindata.samples[i].otu_ids;
            samp  = maindata.samples[i].sample_values;
            otu_labels = maindata.samples[i].otu_labels;
    
            //Sort the data array using the greekSearchResults value
              data.sort(function(a, b) {
                return parseFloat(b.otu_ids) - parseFloat(a.otu_ids);
             });
        
              //Sort the samp array using the greekSearchResults value
              samp.sort(function(a, b) {
                return parseFloat(b.otu_ids) - parseFloat(a.otu_ids);
             });      
          
            // Slice the first 10 objects for plotting
              data = data.slice(0, 10);
        
              // Slice the first 10 objects for plotting
              samp = samp.slice(0, 10);

              // Slice the first 10 objects for plotting
              otu_labels = otu_labels.slice(0, 10);
                                    
            // Reverse the array due to Plotly's defaults
              data = data.reverse();
        
           // Reverse the array due to Plotly's defaults
              samp = samp.reverse();

              // Reverse the array due to Plotly's defaults
              otu_labels = otu_labels.reverse();
        
        
              let data2 = data.map(data => { return `OTU ${data}`});
          
             // Trace1 for the Greek Data
            let trace1 = {
              x: samp,
              y: data2,
              text: otu_labels,
               type: "bar",
              orientation: "h"
            };
          
            // data` as the values for the bar chart.
             let chartData = [trace1];
          
            // Apply the group bar mode to the layout
             let layout = {
               margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
                       }
                };
          
            // Render the plot to the div tag with id "plot"
              Plotly.newPlot("bar", chartData, layout);

let bubbleLayout = {
    margin: { t: 0 },
    hovermode: "closests",
    xaxis: { title: "OTU ID"}
  }

  let bubbleData = [
    {
      x: data,
      y: samp,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: samp,
        color: data,
        colorscale: "Earth"
      }
    }
  ]

  Plotly.plot("bubble", bubbleData, bubbleLayout);

  buildMetadata(selectedvalue);

        }


    }  
}

function buildMetadata(sample) {

    let metadata  = maindata.metadata;
    
for(i = 0 ; i< metadata.length; i++){

if(sample ==  metadata[i].id){

    console.log(metadata[i].id  + metadata[i].ethnicity + metadata[i].gender + metadata[i].age + metadata[i].location + metadata[i].bbtype  );

    document.getElementById('sample-metadata').innerHTML =
    `<h6>id: ${metadata[i].id}</h6>
    <h6>ethnicity: ${metadata[i].ethnicity}</h6>
    <h6>gender: ${metadata[i].gender}</h6>
    <h6>age: ${metadata[i].age}</h6>
    <h6>location: ${metadata[i].location}</h6>
    <h6>bbtype: ${metadata[i].bbtype }</h6>
    <h6>wfreq: ${metadata[i].wfreq }</h6>
    
    
    `;

}


  }}