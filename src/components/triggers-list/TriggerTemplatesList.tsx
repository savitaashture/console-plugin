import {
  getGroupVersionKindForModel,
  K8sResourceCommon,
  ListPageBody,
  ListPageFilter,
  useK8sWatchResource,
  useListPageFilter,
  VirtualizedTable,
} from '@openshift-console/dynamic-plugin-sdk';
import * as React from 'react';
import { useParams } from 'react-router-dom-v5-compat';
import { useDefaultColumns } from '../list-pages/default-resources';
import { TriggerTemplateModel } from '../../models';
import EventListenersRow from './EventListenersRow';

type TriggerTemplatesListProps = {
  namespace?: string;
  hideNameLabelFilters?: boolean;
};

const TriggerTemplatesList: React.FC<TriggerTemplatesListProps> = ({
  namespace,
  hideNameLabelFilters,
}) => {
  const { ns } = useParams();
  namespace = namespace || ns;
  const columns = useDefaultColumns();
  const [triggerTemplates, triggerTemplatesLoaded, triggerTemplatesLoadError] =
    useK8sWatchResource<K8sResourceCommon[]>({
      groupVersionKind: getGroupVersionKindForModel(TriggerTemplateModel),
      isList: true,
      namespace,
    });
  const [staticData, filteredData, onFilterChange] =
    useListPageFilter(triggerTemplates);
  return (
    <ListPageBody>
      <ListPageFilter
        data={staticData}
        onFilterChange={onFilterChange}
        loaded={triggerTemplatesLoaded}
        hideColumnManagement
        hideNameLabelFilters={hideNameLabelFilters}
      />
      <VirtualizedTable
        columns={columns}
        data={filteredData}
        loaded={triggerTemplatesLoaded}
        loadError={triggerTemplatesLoadError}
        Row={EventListenersRow}
        unfilteredData={staticData}
      />
    </ListPageBody>
  );
};

export default TriggerTemplatesList;
