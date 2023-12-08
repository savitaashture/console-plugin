import { consoleProxyFetchJSON } from './proxy';
import { SummaryProps } from '../pipelines-overview/utils';
import {
  TektonResultsOptions,
  createTektonResultsSummaryUrl,
} from './tekton-results';

export type SummaryResponse = {
  summary: SummaryProps[];
};

export const getResultsSummary = async (
  namespace: string,
  options?: TektonResultsOptions,
  nextPageToken?: string,
) => {
  const url = await createTektonResultsSummaryUrl(
    namespace,
    options,
    nextPageToken,
  );
  try {
    const sData: SummaryResponse = await consoleProxyFetchJSON({
      url,
      method: 'GET',
      allowInsecure: true,
    });

    return sData;
  } catch (e) {
    console.log('Summary API Error', e);
    throw e;
  }
};
