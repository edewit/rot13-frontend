import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import '@patternfly/react-core/dist/styles/base.css';
import { Brand, Grid, GridItem, Button, Card, CardBody, CardFooter, Page, PageSection, PageSectionVariants, PageHeader, TextContent, Text, Toolbar, ToolbarGroup, ToolbarItem } from '@patternfly/react-core';
import { ClipboardCheckIcon, ClipboardIcon } from '@patternfly/react-icons';
import axios from 'axios';

import logo from './assets/RHD-logo.svg';
import summitLogo from './assets/Logo_Event_RHSummit_RGB_Red.png';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      rot13: '',
      copied: 0
    }

    this.rot13 = this.rot13.bind(this);
    this.onCopy = this.onCopy.bind(this);
    this.onMouseOutOfCopy = this.onMouseOutOfCopy.bind(this);
  }

  render() {
    const PageToolbar = (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarItem>
            <Brand src={summitLogo} alt="Red Hat" className="brand" />
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
    );
    const Header = (
      <PageHeader
        logo={<Brand src={logo} alt="Red Hat" className="brand"/>}
        logoProps={{ href: '/' }}
        toolbar={PageToolbar}
        className="header"
      />);
    return (
      <Page header={Header}>
        <PageSection variant={PageSectionVariants.light}>
          <Grid className="App">
            <GridItem span={12}>
              <TextContent>
                <Text component="h1">Spoiler editor</Text>
              </TextContent>
            </GridItem>
            <GridItem sm={12} md={6}>
              <textarea
                placeholder="Type your spoilers..."
                autoComplete="off"
                value={this.state.cleartext}
                onChange={this.rot13}
              ></textarea>
            </GridItem>
            <GridItem sm={12} md={6}>
              <Card>
                <CardBody>
                  <div className="output">
                    {this.state.rot13}
                  </div>
                </CardBody>
                <CardFooter>
                  <CopyToClipboard
                    text={this.state.rot13}
                    onCopy={this.onCopy}
                  >
                    <Button
                      className="copy-button"
                      title="Copy to clipboard"
                      onMouseLeave={this.onMouseOutOfCopy}
                    >
                      {this.state.copied ? <ClipboardCheckIcon /> : <ClipboardIcon />}
                    </Button>
                  </CopyToClipboard>
                </CardFooter>
              </Card>
            </GridItem>
          </Grid>
        </PageSection>
      </Page>
    );
  }

  rot13(event) {

    const url = "http://rot13-rot13.7e14.starter-us-west-2.openshiftapps.com/api/rot13?input=";
    const input = event.target.value;

    axios.get(url + input).then(response => this.setState({
      rot13: response.data.content
    }));

  };

  onCopy() {
    this.setState({ copied: 1 });
  }

  onMouseOutOfCopy() {
    this.setState({ copied: 0 });
  }
}

export default App;
