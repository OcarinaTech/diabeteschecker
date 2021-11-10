const About = () => {
  return (
    <>
      <h1>About </h1>
      <p>This is a collaborative project between between Yoko Kawamoto and Jarvis Raymond exploring the integration of machine learning with modern web technologies. This application uses AWS to deploy a Node.js backend using the Express.js library to pass results to a machine learning model created using Sci-kit Learn in Python. This model is trained on the "Early stage diabetes risk prediction dataset" from the UCI Machine Learning Repository (<a href="https://archive.ics.uci.edu/ml/datasets/Early+stage+diabetes+risk+prediction+dataset." target="_blank" rel="noreferrer" >see here</a>) and is the result of a comparitive analysis between multiple learners and hyperparameters (<a href="https://www.jarvisdraymond.com/omscs/ML/Supervised_Learning_Analysis_Jarvis_Raymond.pdf" target="_blank" rel="noreferrer">see here</a>). This model is sent the data from a React frontend and reports back to the user their liklihood of early stage diabetes. Due to the dataset's bias, the model tends to predict positive for early stage diabetes risk for most responses.</p>
    </>
  );
};

export default About;
