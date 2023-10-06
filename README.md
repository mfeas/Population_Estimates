# Population Census Data Analysis 

## Introduction
This repository contains the code and data used for analyzing Census data from 2018 and 2019 using the Census API. The analysis involved querying data, cleaning it, performing calculations, and creating visualizations to gain insights into population and racial composition changes in the United States.

## Data Retrieval
- Dwight utilized the Census API and an API Key to create URLs for querying and pulling relevant data for 2018 and 2019.
- Used Python to call the API data included information on White, Black, American Indian and Alaskan natives, Asians, and Pacific Islanders.
- Data collection was based on Census-provided variables and API operation instructions.

## Data Cleaning and Analysis
- Joly inspected the data and identified inconsistencies that could lead to inaccurate results. Data cleaning involved removing incoherent values, standardizing data types, ensuring correctness, and dropping unnecessary columns.
- Due to the nature of the API, this cleaning process had to be repeated multiple times, resulting in over 10 cleaned dataframes.
- The initial analysis focused on population changes in the US from 2018 to 2019.
- Two key questions addressed were:
  1. "What is the percentage change in the population for each state?"
  2. "What is the overall percentage change in the population of the United States from 2018 to 2019?"
- Joly calculated percentage changes for each state using cleaned dataframes containing population values for both years.
- The analysis also examined racial composition changes from 2018 to 2019.
- Data breakdown by race in both years was achieved by cleaning individual race dataframes, merging them, and creating a CSV file with racial population percentages and changes.
- The resulting table showcases ethnicities from most to least populated, with the white race being the most predominant and Pacific Islander the least.

## Data Storage
- Ross imported dataframes into database tables, ensuring column names matched dataset column names.
- The "character varying" data type was used to handle columns with mixed data types.
- Data importation was verified by checking rows and comparing the SQL table with the CSV file.

## Data Visualization
- Mary used the CSV files generated from the analysis to three create interactive data visualizations.
- Interactive visualizations include:
  - A bar chart showing population changes, switchable between positive and negative changes using d3 charts showing the negative and positive population changes using a drop down box.
  - Five scatter plots using plotly displaying race counts, with the ability to switch between races.
  - An drop down box to switch between the five plots.
  - A bar chart illustrating percentage changes in race composition, with detailed hover data for deeper insights.
  - Used highcharts to create a bar chart showing the percentage changes in race using the race info csv.

## Conclusion
Data cleaning and analysis are essential steps in uncovering insights and trends, especially with location-based data. Accurate data and thorough analysis enable informed decision-making and a deeper understanding of demographic changes in the United States.
