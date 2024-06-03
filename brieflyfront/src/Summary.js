import React from 'react';

const Summary = ({ summary }) => {
  const overallSummary = summary.overall_summary;
  const topicSummaries = summary.topic_summaries;

  return (
    <div className="summary">
      <h2>Summary</h2>
      {topicSummaries.map((topicSummary, index) => (
        <div key={index}>
          <h3><strong>{topicSummary.topic_name}</strong></h3>
          <p>{topicSummary.summary}</p>
        </div>
      ))}
      <div>
        <h3><strong>Overall Summary</strong></h3>
        <p>{overallSummary}</p>
      </div>
    </div>
  );
}

export default Summary;
