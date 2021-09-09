import client from './client';

export const postQuestionResult = ({
  vocab_id,
  vocab,
  mean,
  answer_vocab_id,
  answer_vocab,
  answer_mean,
  result_flag,
}) =>
  client.post('/vocab/study/multiple/post', {
    vocab_id,
    vocab,
    mean,
    answer_vocab_id,
    answer_vocab,
    answer_mean,
    result_flag,
  });
