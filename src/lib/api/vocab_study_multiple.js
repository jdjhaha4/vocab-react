import client from './client';

export const insertQuestionResult = ({
  group_code,
  group_name,
  vocab_count,
  answer_count,
  wrong_answer_count,
  complete_flag,
  study_time_seconds,
}) =>
  client.post('/vocab/question/result/insert', {
    group_code,
    group_name,
    vocab_count,
    answer_count,
    wrong_answer_count,
    complete_flag,
    study_time_seconds,
  });

export const postQuestionResult = ({
  vocab_question_result_id,
  group_code,
  question_type,
  question_value,
  vocab_id,
  vocab,
  mean,
  answer_vocab_id,
  answer_vocab,
  answer_mean,
  result_flag,
}) =>
  client.post('/vocab/study/multiple/post', {
    vocab_question_result_id,
    group_code,
    question_type,
    question_value,
    vocab_id,
    vocab,
    mean,
    answer_vocab_id,
    answer_vocab,
    answer_mean,
    result_flag,
  });
