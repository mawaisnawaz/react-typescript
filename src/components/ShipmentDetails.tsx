import React, { useState } from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { EditInput, CardHeader, PageHeader, Title, Data, Content, Section, MarginLeft, MarginTop } from './styles';
import { updateShipmentChartInfo } from '../store/actions/shipmentsList';
import { updateShipmentInfo } from '../store/actions/shipmentDetails';
import { Input, Button, Card } from 'antd';

interface ShipmentDetails {
  id: string;
  name: string;
  cargo: [
    {
      type?: string;
      description?: string;
      value?: string;
      volume?: string;
    }
  ];
  mode: string;
  type: string;
  destination: string;
  origin: string;
  services: [
    {
      type?: string;
      value?: string;
      volume?: string;
    }
  ];
  total: number;
  status: string;
  userId: string;
}

const ShipmentDetails: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const state = useSelector(state => state);
  const shipmentDetails: ShipmentDetails = get(state, 'details.shipment', {});

  const [name, setName] = useState(shipmentDetails.name);

  const nameChangeHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    setName(e.currentTarget.value);
  };

  const editNameHandler = (): void => {
    setIsEdit(true);
  };

  const cancelEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    e.preventDefault();
    setIsEdit(false);
    setName(shipmentDetails.name);
  };

  const saveName = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    e.preventDefault();
    setIsEdit(false);
    dispatch(updateShipmentInfo(name));
    dispatch(updateShipmentChartInfo(shipmentDetails.id, name));
  };

  const generateInput = (): React.ReactElement => {
    return (
      <React.Fragment>
        <Input value={name} onChange={nameChangeHandler} style={EditInput} />
        <div style={{ ...MarginTop }}>
          <Button type="primary" onClick={saveName}>
            Save
          </Button>
          <Button type="danger" onClick={cancelEdit} style={MarginLeft}>
            Cancel
          </Button>
        </div>
      </React.Fragment>
    );
  };

  const generateValue = (): React.ReactElement => {
    return (
      <React.Fragment>
        <span>{name}</span>
        <Button type="primary" onClick={editNameHandler} style={MarginLeft}>
          Edit
        </Button>
      </React.Fragment>
    );
  };

  const { id, origin, destination, mode, cargo, type, services, total, status, userId } = shipmentDetails;
  return (
    <div className="details-container">
      <PageHeader>
        <label>
          {id}: {name}
        </label>
        <Link to="/">
          <Button type="default" className="back-button">
            {' '}
            Back
          </Button>
        </Link>
      </PageHeader>
      <Section>
        <Card type="inner" title="Overview" headStyle={CardHeader}>
          <Content>
            <Title>Name</Title>
            <Data>{isEdit ? generateInput() : generateValue()}</Data>
          </Content>
          <Content>
            <Title>user Id</Title>
            <Data>{userId}</Data>
          </Content>
          <Content>
            <Title>Origin</Title>
            <Data>{origin}</Data>
          </Content>
          <Content>
            <Title>Destination</Title>
            <Data>{destination}</Data>
          </Content>
          <Content>
            <Title>Mode</Title>
            <Data>{mode}</Data>
          </Content>
          <Content>
            <Title>Type</Title>
            <Data>{type}</Data>
          </Content>
          <Content>
            <Title>Status</Title>
            <Data>{status}</Data>
          </Content>
          <Content>
            <Title>total</Title>
            <Data>{total}</Data>
          </Content>
        </Card>

        <Card title="Services" style={{ marginTop: 16 }} headStyle={CardHeader}>
          {services
            ? services.map((s, index) => (
                <div key={index}>
                  <Content>
                    <Title>Type</Title>
                    <Data>{s.type}</Data>
                  </Content>
                  <Content>
                    <Title>Value</Title>
                    <Data>{s.value || 'N/A'}</Data>
                  </Content>
                </div>
              ))
            : ''}
        </Card>

        <Card title="Cargo" style={{ marginTop: 16 }} headStyle={CardHeader}>
          {cargo
            ? cargo.map((s, index) => (
                <div key={index}>
                  <Content>
                    <Title>Type</Title>
                    <Data>{s.type}</Data>
                  </Content>
                  <Content>
                    <Title>Description</Title>
                    <Data>{s.description || 'N/A'}</Data>
                  </Content>
                  <Content>
                    <Title>Volume</Title>
                    <Data>{s.volume || 'N/A'}</Data>
                  </Content>
                </div>
              ))
            : ''}
        </Card>
      </Section>
    </div>
  );
};

export default ShipmentDetails;
