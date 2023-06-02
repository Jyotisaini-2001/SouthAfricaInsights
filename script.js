(async () => {
    const topology = await fetch(
      'https://code.highcharts.com/mapdata/countries/za/za-all.topo.json'
    ).then(response => response.json());
  
    // Prepare your data. The data is joined to the map using the value of 'hc-key' property by default.
    // Modify the data array with your actual data
    const data = [
      ['za-ec', 512.42],
      ['za-np', 267.1],
      ['za-nl', 673.7],
      ['za-wc', 641.31],
      ['za-nc', 118.88],
      ['za-nw', 255.64],
      ['za-fs', 354.81],
      ['za-gt', 1449.43],
      ['za-mp', 436.21]
    ];
  
    // Define the URL mapping for each state's embedded data
    const stateDataUrls = {
      'za-ec': 'https://southafrica.opendataforafrica.org/apps/atlas/embed/Eastern-Cape/Unemployed',
      'za-np': 'https://southafrica.opendataforafrica.org/apps/atlas/embed/Limpopo/Unemployed',
      'za-nl': 'https://southafrica.opendataforafrica.org/apps/atlas/embed/KwaZulu-Natal/Unemployed',
      'za-wc': 'https://southafrica.opendataforafrica.org/apps/atlas/embed/Western-Cape/Unemployed',
      'za-nc': 'https://southafrica.opendataforafrica.org/apps/atlas/embed/Northern-Cape/Unemployed',
      'za-nw': 'https://southafrica.opendataforafrica.org/apps/atlas/embed/North-West/Unemployed',
      'za-fs': 'https://southafrica.opendataforafrica.org/apps/atlas/embed/Free-State/Unemployed',
      'za-gt': 'https://southafrica.opendataforafrica.org/apps/atlas/embed/Gauteng/Unemployed',
      'za-mp': 'https://southafrica.opendataforafrica.org/apps/atlas/embed/Mpumalanga/Unemployed'
    };
  
    // Define the color ranges based on unemployment data
    const colorRanges = [
      { min: 110, max: 118.9, color: '#00FF00' }, // Green
      { min: 118.9, max: 270, color: '#90EE90' }, // Light Green
      { min: 270, max: 440, color: '#FFFF00' }, // Yellow
      { min: 440, max: 650, color: '#FFC0CB' }, // Light Red
      { min: 650, max: 1450, color: '#8B0000' } // Dark Red
    ];
  
    // Create the chart
    const chart = Highcharts.mapChart('container', {
      chart: {
        map: topology
      },
  
      title: {
        text: 'Unemployment Rate in South Africa'
      },
  
      subtitle: {
        text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/za/za-all.topo.json">South Africa</a>'
      },
  
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },
  
      colorAxis: {
        min: 0,
        max: 1450,
        stops: colorRanges.map(range => [range.min / 1450, range.color])
      },
  
      series: [{
        data: data,
        name: 'Unemployment Rate',
        states: {
          hover: {
            color: '#BADA55'
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        },
        point: {
          events: {
            mouseOver: function () {
              const stateCode = this.options['hc-key'];
              const chartURL = stateDataUrls[stateCode];
  
              const iframe = document.getElementById('chart-iframe');
              iframe.src = chartURL;
            }
          }
        }
      }]
    });
  })();
   