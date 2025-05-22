# Mental Age Test

A web-based psychological age assessment tool that evaluates users' psychological maturity through scientifically designed multidimensional questions.
## Demo

🔗 [Live Demo](https://mentalagetest.org/)
## Project Overview

This project provides a comprehensive psychological age test that assesses users' performance in six dimensions: emotional regulation, cognitive flexibility, social adaptability, responsibility, future planning, and self-awareness. The test results are presented in a detailed psychological age report, with intuitive charts and personalized growth suggestions.

## Features

- **Multidimensional Assessment**: A complete test covering six dimensions of psychological maturity.
- **Responsive Design**: A modern UI that adapts to various device sizes.
- **Local Data Storage**: Uses localStorage to save test progress.
- **Visual Results**: Generates intuitive test result charts using Chart.js.
- **Detailed Analysis Report**: Provides scores for each dimension and personalized growth suggestions.
- **Test Progress Saving**: Supports resuming the test after interruption.

## Installation and Usage

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/handsometong/mentalAgeTest.git
   cd mental-age-test
   ```


## Project Structure

- **index.html** - The test homepage, containing the test introduction and entry point.
- **test.html** - The test question page, displaying the test questions and options.
- **results.html** - The test results page, presenting a detailed analysis report.
- **main.js** - Implements functionality related to the homepage.
- **testLogic.js** - Core logic of the test, including the question bank and scoring algorithm.
- **resultLogic.js** - Logic for the results page, handling score calculation and chart display.
- **styles.css** - Custom stylesheet.

## Technology Stack

- HTML5
- CSS3 (Tailwind CSS framework)
- JavaScript (Vanilla)
- Chart.js (Data visualization)
- Local Storage (localStorage API)

## Functionality Description

1. **Test Questionnaire**: Contains 24 carefully designed questions covering six psychological dimensions.
2. **Progress Saving**: Automatically saves users' answering progress, allowing them to continue after interruption.
3. **Multidimensional Analysis**: Calculates users' scores in each psychological dimension and overall psychological age.
4. **Personalized Report**: Provides customized analysis and improvement suggestions based on test results.
5. **Result Sharing**: Supports sharing test results.

## Development and Extension

To modify or extend the test content:
1. Add or modify questions in the `testLogic.js` file within the `testQuestions` array.
2. Each question should include a dimension, question text, and options with scores.
3. The scoring algorithm is located in the `completeTest()` function.

## License

MIT License

