import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { get } from "lodash";
import { Table, Tag, Button, Input } from "antd";
import { SearchStyle, PageHeader, Section } from "./styles";
import { fetchShipmentData } from "../store/actions/shipmentsList";
import { fetchShipmentDetails } from "../store/actions/shipmentDetails";
const { Search } = Input;

type TableDataType = [object];
interface ChildComponentProps extends RouteComponentProps<any> {}

interface ShipmentListState {
  list: {};
}

const typedUseSelector: TypedUseSelectorHook<ShipmentListState> = useSelector;

enum STATUS_BADGE {
  COMPLETED = "success",
  NEW = "blue",
  ACTIVE = "warning",
}

const ShipmentsList: React.FC<ChildComponentProps> = ({
  history,
}): React.ReactElement => {
  const listData = typedUseSelector(
    (state: any): ShipmentListState => state.list
  );
  const tableData = get(listData, "tableData", []);
  const dispatch = useDispatch();
  const [shipmentList, setShipmentList] = useState<TableDataType>(tableData);

  const searchShipment = (e: React.FormEvent<HTMLInputElement>): void => {
    const input = e.currentTarget.value.trim();
    const filteredList = tableData.filter((item) => {
      return item.id.toLowerCase().search(input.toLowerCase()) !== -1;
    });

    setShipmentList(filteredList);
  };

  const viewShipmentDetails = async (id: string) => {
    dispatch(fetchShipmentDetails(id));
    history.push("/details");
  };

  const columns: object[] = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a: { id: string }, b: { id: string }): number =>
        a.id.localeCompare(b.id),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: { name: string }, b: { name: string }): number =>
        a.name.localeCompare(b.name),
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "orgin",
      sorter: (a: { origin: string }, b: { origin: string }): number =>
        a.origin.localeCompare(b.origin),
    },
    {
      title: "Destination",
      dataIndex: "destination",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string): React.ReactElement => {
        const color: string = STATUS_BADGE[status];
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "id",
      render: (id: string): React.ReactElement => {
        return (
          <Button type="primary" onClick={() => viewShipmentDetails(id)}>
            Details
          </Button>
        );
      },
    },
  ];

  useEffect((): void => {
    dispatch(fetchShipmentData());
  }, [dispatch]);

  return (
    <React.Fragment>
      <PageHeader>Shipments List</PageHeader>
      <Section>
        <Search
          placeholder="Search Shipment"
          onChange={searchShipment}
          style={SearchStyle}
        />
        <Table
          rowKey="id"
          columns={columns}
          dataSource={shipmentList}
          pagination={{ pageSize: 20 }}
        />
      </Section>
    </React.Fragment>
  );
};

export default withRouter(ShipmentsList);
