import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
// For some reason eslint import plugin is unable to detect the following type
// eslint-disable-next-line
import { Column } from 'react-table';

import { HARBORS_QUERY } from './harborsQuery';
import PropertyIcon from './propertyIcon/PropertyIcon';
import Table from '../../common/table/Table';
import { getHarborsData, HarborData } from './utils';
import { HARBORS } from './__generated__/HARBORS';
import Card from '../../common/card/Card';
import Text from '../../common/text/Text';
import Paragraph from '../../common/paragraph/Paragraph';
import LabelValuePair from '../../common/labelValuePair/LabelValuePair';
import Box from '../../common/box/Box';

interface Props2 {
  streetAddress?: string;
  zipCode?: React.ReactNode;
  municipality?: string;
  wwwUrl?: string;
}

interface Props {
  data: Props2;
}

const HarborDetails = ({ data }: Props) => {
  const address = `${data.streetAddress} ${data.zipCode} ${data.municipality}`;

  const Harbor1 = () => (
    <Card>
      <Paragraph title="Osoite">
        <Text color="brand" size="xs">
          {address}
        </Text>
      </Paragraph>
      <Paragraph>
        <Text color="brand" size="s">
          <a href={data.wwwUrl}>Toimipisteen nettisivut</a>
        </Text>
      </Paragraph>
      <Paragraph>
        <Text color="brand" size="s">
          Satamakartta (PDF)
        </Text>
      </Paragraph>
      <Paragraph>
        <Text color="brand" size="s">
          Google maps
        </Text>
      </Paragraph>
    </Card>
  );

  const Harbor2 = () => (
    <Card>
      <Paragraph>
        <LabelValuePair label="Max leveys" value="2.5m - 4m" />
        <LabelValuePair
          label="Kiinnitys"
          value="Aisa-, Kävelyaisa- ja Peräpoijupaikkoja"
        />
        <LabelValuePair
          label="Päällikkö"
          value="Mikko Mallikas +358 00 000 000"
        />
        <LabelValuePair label="Huoltotiimi" value="Itäinen veneilytiimi" />
      </Paragraph>
    </Card>
  );

  const Harbor3 = () => (
    <Card>
      <Paragraph title="Viimeaikainen toiminta">
        <Text color="brand" size="xs">
          Ei mitään
        </Text>
      </Paragraph>
    </Card>
  );

  return (
    <Box>
      <Harbor1 />
      <Harbor2 />
      <Harbor3 />
    </Box>
  );
};

type ColumnType = Column<HarborData> & { accessor: keyof HarborData };

const HarborsContainer: React.FC = () => {
  const { loading, error, data } = useQuery<HARBORS>(HARBORS_QUERY);
  const { t } = useTranslation();
  const columns: ColumnType[] = [
    {
      Header: t('harbors.tableHeaders.harbor'),
      accessor: 'name',
    },
    {
      Header: t('harbors.tableHeaders.places'),
      accessor: 'numberOfPlaces',
    },
    {
      Cell: ({ cell }) => <PropertyIcon name="plug" disabled={!!cell.value} />,
      Header: () => <PropertyIcon name="plug" />,
      accessor: 'electricity',
    },
    {
      Cell: ({ cell }) => <PropertyIcon name="fence" disabled={!!cell.value} />,
      Header: () => <PropertyIcon name="fence" />,
      accessor: 'gate',
    },
    {
      Cell: ({ cell }) => (
        <PropertyIcon name="streetLight" disabled={!!cell.value} />
      ),
      Header: () => <PropertyIcon name="streetLight" />,
      accessor: 'lighting',
    },
    {
      Cell: ({ cell }) => (
        <PropertyIcon name="waterTap" disabled={!!cell.value} />
      ),
      Header: () => <PropertyIcon name="waterTap" />,
      accessor: 'water',
    },
    {
      Cell: ({ cell }) => <PropertyIcon name="trash" disabled={!!cell.value} />,
      Header: () => <PropertyIcon name="trash" />,
      accessor: 'wasteCollection',
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const tableData = getHarborsData(data);

  return (
    <Table
      data={tableData}
      columns={columns}
      renderSubComponent={row => <HarborDetails data={row.original} />}
      renderMainHeader={() => t('harbors.tableHeaders.mainHeader')}
      canSelectRows
    />
  );
};

export default HarborsContainer;
