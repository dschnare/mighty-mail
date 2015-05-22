# Mighty Mail

Reactjs components for static server rendering of HTML emails.

# Usage

This package is intended to be used as part of a Reactjs build system. For convenience Mighty Mail includes
stylesheets that take care of email client resetting and adding classes for several useful styles. Think of these
styles as a base. All styles are also included as sass and less files.

	npm install mighty-mail


# Gotchas

Because we're using React there are a few gotchas that you'll have to be aware of when implementing your emails.

- HTML or JavaScript comments are not permitted in JSX code.

To get around this the Mighty Mail components render HTML in a fashion that permitts HTML comments
using the React binding syntax:

	{"<!-- my comment -->"}

- Normally HTML entities are a big problem with React, but the Mighty Mail components are rendered in a way that permits HTML entities.

For example, Mighty Mail will render this as you would expect.

	<Row>
		<Col>Procter &amp; Gamble</Col>
	</Row>

However, there may be certain cases where you get escaped output. For those cases you can use any of the built in HTML entities provided by Mighty Mail
or you can use your own. You'll simply have to use the unicode sequence for your entity in a React binding.

	// Renders the same as above.
	<Row>
		<Col>Procter {"\u0026"} Gamble</Col>
	</Row>

Or using the Mighty Mail entity for ampersand:

	<Row>
		<Col>Procter {mighty.AMP} Gamble</Col>
	</Row>

The following entites are exported on the module.

	AMP = "\u0026";
	NBSP = "\u00A0";
	RSQUO = "\u2019";
	LSQUO = "\u2018";
	RDQUO = "\u201D";
	LDQUO = "\u201C";
	EMDASH = "\u2014";
	ENDASH = "\u2013";
	REG = "\u00AE";
	TM = "\u2122";
	BULL = "\u2022";
	GT = "\u003E";
	LT = "\u003C";



# Components

## Layout

The following are layout oriented components that will help semantically setup your scaffolding fast.


### Table

The `Table` component is an alias for creating a `<table>` with `cellspacing`, `cellpadding` and `border` set to `0`.

**Example**

    var React = require("react");
    var Table = require("./Table");
    
    /*eslint no-unused-vars: 0*/
    
    module.exports = (
      <Table>
        <tbody>
          <tr>
            <td>Col 1</td>
            <td>Col 2</td>
          </tr>
        </tbody>
      </Table>
    );

**Result**

    <table cellspacing="0" cellpadding="0" border="0" align="left">
      <tbody>
        <tr>
          <td>Col 1</td>
          <td>Col 2</td>
        </tr>
      </tbody>
    </table>

**Props**

- cellPadding : string `(default 0)`
- cellSpacing : string `(default 0)`
- border : number `(default 0)`
- bgColor : string
- className : string
- style : object
- width : string or number
- align : one of "left", "center", "right" `(default "left")`


### Container

The `Container` component is general purpose, composable component that can be used by other components or as a `<table>` wrapper on its own.

**Example**

    var React = require("react");
    var Container = require("./Container");
    
    /*eslint no-unused-vars: 0*/
    
    module.exports = (
      <Container>
        My Content
      </Container>
    );

**Result**

    <table cellspacing="0" cellpadding="0" border="0" align="left" class="container">
      <tbody>
        <tr>
          <td align="left" valign="top" class="container-wrapper">My Content</td>
        </tr>
      </tbody>
    </table>

**Props**

- cssPrefix : string ***[required]*** `(default "container")`
- cellSpacing : number or string `(default 0)`
- cellPadding : number or string `(default 0)`
- border : number or string `(default 0)`
- bgColor : .string
- className : .string
- style : .object
- width : number or string
- align : one of "left", "center", "right" `(default "left")`
- wrapper : shape
	- className : string
	- style : object
	- bgColor : string
	- width : number or string
	- height : number or string
	- align : one of "left", "center", "right" `(default "left")`
	- valign : one of "top", "middle", "bottom" `(default "top")`

The `wrapper` property will have all its properties applied to the inner `.container-wrapper` element.

The `cssPrefix` property will be used as the class name prefix when setting the base class name
for the `<table>` and `<td>` elements.


### Frame

The `Frame` component makes it easy to wrap content in a `<table>` with a border.

**Example**

    var React = require("react");
    var Frame = require("./Frame");
    
    /*eslint no-unused-vars: 0*/
    
    module.exports = (
      <Frame borderColor="#ff0000">
        My Content
      </Frame>
    );

**Result**

    <table cellspacing="0" cellpadding="0" border="0" width="100%" align="center"
    class="frame">
      <tbody>
        <tr>
          <td style="border:1px solid #ff0000;" align="center" valign="top" class="frame-wrapper">My Content</td>
        </tr>
      </tbody>
    </table>

**Props**

- cellSpacing : number or string `(default 0)`
- cellPadding : number or string `(default 0)`
- border : number or string `(default 1)`
- borderColor : string
- bgColor: string
- className : string
- style: object
- width: number or string `(default "100%")`
- align: one of "left", "center", "right" `(default "center")`
- wrapper : shape 
	- className : string
	- style : object
	- bgColor : string
	- width : number or string
	- height : number or string
	- align : one of "left", "center", "right" `(default "center")`
	- valign : one of "top", "middle", "bottom" `(default "top")`


The `wrapper` property will have all its properties applied to the inner `.frame-wrapper` element.



### Row

The `Row` component will layout `Col` components in a single horizontal row with an optionally gutter between each column.

**Example**

    var React = require("react");
    var Row = require("./Row");
    var Col = require("./Col");
    
    /*eslint no-unused-vars: 0*/
    
    module.exports = (
      <Row width={600} gutter={10}>
        <Col wrapper={{align: "center"}}>One</Col>
        <Col wrapper={{align: "center"}}>Two</Col>
      </Row>
    );

**Result**

    <table cellspacing="0" cellpadding="0" border="0" width="600" align="center"
    class="row">
      <tbody>
        <tr>
          <td align="center" valign="top" class="row-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" width="295" align="left"
            class="col">
              <tbody>
                <tr>
                  <td width="295" align="center" class="col-wrapper">One</td>
                </tr>
              </tbody>
            </table>
            <!--[if mso]>
          </td>
          <td align="center" valign="top">
          <![endif]-->
          <table cellspacing="0" cellpadding="0" border="0" width="305" align="left"
          class="col">
            <tbody>
              <tr>
                <td style="padding-left:10px;" width="305" align="center" class="col-wrapper">Two</td>
              </tr>
            </tbody>
          </table>
          </td>
        </tr>
      </tbody>
    </table>

**Props**

- cellSpacing : number or string `(default 0)`
- cellPadding : number or string `(default 0)`
- border : number or string `(default 0)`
- borderColor : string
- bgColor: string
- className : string
- style: object
- width: number or string `(default "100%")`
- align: one of "left", "center", "right" `(default "center")`
- gutter : number
- wrapper : shape 
	- className : string
	- style : object
	- bgColor : string
	- width : number or string
	- height : number or string
	- align : one of "left", "center", "right" `(default "left")`
	- valign : one of "top", "middle", "bottom" `(default "top")`

The `wrapper` property will have all its properties applied to the inner `.row-wrapper` element.

If no `gutter` is speficied or the `width` is a string then the columns will not be distrubuted (i.e. their widths will be untouched).
Otherwise each column will have its width distributed appropriately to support the gutter. You can still specify a width as a string or
a number with no gutter and manually specify your column widths.



### Col

The `Col` component is mainly used as a column within a row, but there are no restrictions as to where it can be used.

**Example**

    var React = require("react");
    var Col = require("./Col");
    
    /*eslint no-unused-vars: 0*/
    
    module.exports = (
      <Col wrapper={{align: "center"}}>My Column</Col>
    );

**Result**

    <table cellspacing="0" cellpadding="0" border="0" align="left" class="col">
      <tbody>
        <tr>
          <td align="center" class="col-wrapper">My Column</td>
        </tr>
      </tbody>
    </table>

**Props**

- cellSpacing : number or string `(default 0)`
- cellPadding : number or string `(default 0)`
- border : number or string `(default 0)`
- bgColor : .string
- className : .string
- style : .object
- width : number or string
- align : one of "left", "center", "right" `(default "left")`
- float : one of "left", "right"
- span : number `(default 1)`
- gutter : number
- wrapper : shape
	- className : string
	- style : object
	- bgColor : string
	- width : number or string
	- height : number or string
	- align : one of "left", "center", "right" `(default "left")`
	- valign : one of "top", "middle", "bottom" `(default "top")`

The `wrapper` property will have all its properties applied to the inner `.col-wrapper` element.

The `span` property is used by the `Row` component as a colspan for a given column.



### FullWidthRow

The `FullWidthRow` is a kind of row that will span the entire width of an email but have a nested row markup.
This component is useful for having a full width section with a background color while still having your content
respect the deimensions of the email body.

**Example**

    var React = require("react");
    var FullWidthRow = require("./FullWidthRow");
    var Col = require("./Col");
    
    /*eslint no-unused-vars: 0*/
    
    module.exports = (
      <FullWidthRow bgColor="#eaeaea">
        <Col>One</Col>
        <Col>Two</Col>
      </FullWidthRow>
    );

**Result**

    <table cellspacing="0" cellpadding="0" border="0" bgcolor="#eaeaea" class="full-width-row"
    width="100%" align="center">
      <tbody>
        <tr>
          <td align="center" valign="top" class="full-width-row-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" width="100%" align="center"
            class="row">
              <tbody>
                <tr>
                  <td align="center" valign="top" class="row-wrapper">
                    <table cellspacing="0" cellpadding="0" border="0" align="left" class="col">
                      <tbody>
                        <tr>
                          <td align="left" valign="top" class="col-wrapper">One</td>
                        </tr>
                      </tbody>
                    </table>
                    <!--[if mso]>
                  </td>
                  <td align="center" valign="top">
                  <![endif]-->
                  <table cellspacing="0" cellpadding="0" border="0" align="left" class="col">
                    <tbody>
                      <tr>
                        <td align="left" valign="top" class="col-wrapper">Two</td>
                      </tr>
                    </tbody>
                  </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>

**Props**

- cellSpacing : number or string `(default 0)`
- cellPadding : number or string `(default 0)`
- border : number or string `(default 0)`
- bgColor : .string
- className : .string
- style : .object
- width : number or string `(default "100%")`
- align : one of "left", "center", "right" `(default "center")`
- wrapper : shape
	- className : string
	- style : object
	- bgColor : string
	- width : number or string
	- height : number or string
- rowWrapper : shape
	- className : string
	- style : object
	- bgColor : string
	- width : number or string
	- height : number or string
	- align : one of "left", "center", "right" `(default "left")`
	- valign : one of "top", "middle", "bottom" `(default "top")`

The `bgColor` and `className` properties are applied to the `.full-width-row` element.

The `width` and `gutter` properties are passed to a nested `Row` component.

The `wrapper` property will have all its properties applied to the inner `.full-width-row-wrapper` element.

The `rowWrapper` property will have all its properties applied to the inner `.row-wrapper` element.


## Content

The following are content oriented components that will help you semantically organize your content.

### RawHtml

The `RawHtml` component is a convenient way to render complex HTML or comments that would not otherwise be permitted with Reactjs.

**Example**

    var React = require("react");
    var RawHtml = require("./RawHtml");
    
    /*eslint no-unused-vars: 0*/
    
    module.exports = (
      <RawHtml>{"<!-- This will be redered as an HTML comment -->"}</RawHtml>
    );

**Result**

    <div>
      <!-- This will be redered as an HTML comment -->
    </div>

**Props**

- wrapper : string ***[required]*** `(default "div")`
- any property

The `wrapper` propery is the name of the element to wrap the conetent of the component with.

All other properties are set on the wrapper element as-is.



### Divider

The `Divider` component renders a horizontal divider.

**Example**

    var React = require("react");
    var Divider = require("./Divider");
    
    /*eslint no-unused-vars: 0*/
    
    module.exports = (
      <Divider color="#000000" thickness={2} />
    );

**Result**

    <table cellspacing="0" cellpadding="0" border="0" class="divider" width="100%"
    align="center">
      <tbody>
        <tr>
          <td bgcolor="#000000" class="divider-wrapper" style="font-size:1px;line-height:1;mso-line-height-rule:exactly;"
          width="100%" height="2" align="center"> </td>
        </tr>
      </tbody>
    </table>

**Props**

- width : number or string `(default "100%")`
- thickness : number `(default 1)`
- color : string `(default "#eaeaea")`
- className : string
- wrapper : shape
	- className: string

The `wrapper` property will have all its properties applied to the inner `.divider-row-wrapper` element.



### Image

The `Image` component renders an image, but if no `width` or `height` is specified then the dimensions will be read from the file and be set on the rendered `<img>` element.

**Example**

    var React = require("react");
    var Image = require("./Image");
    
    /*eslint no-unused-vars: 0*/
    
    module.exports = (
      <Image width="200" src="images/logo.jpg" />
    );

**Result**

    <img src="images/logo.jpg" width="200" border="0">

**Props**

- src : string
- width : number or string
- height : number or string
- border : number or string `(default 0)`
- className : string
- style : object



### Hero

The `Hero` component renders an area with a background image behind its content.

**Example**

    var React = require("react");
    var Hero = require("./Hero");
    
    /*eslint no-unused-vars: 0*/
    
    module.exports = (
      <Hero width={600} height={400} background="images/hero.jpg" bgColor="#ffffff">
        This is in the middle of the hero.
      </Hero>
    );

**Result**

    <table cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" class="hero"
    width="600" align="center">
      <tbody>
        <tr>
          <td align="center" valign="middle" background="images/hero.jpg" bgcolor="#ffffff"
          width="600" height="400" class="hero-bg">
            <!--[if gte mso 9]>
              <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false"
              style="width:600px;height:400px;">
                <v:fill type="tile" src="images/hero.jpg" color="#ffffff" />
                <v:textbox inset="0,0,0,0">
                <![endif]-->
                <div>
                  <table cellspacing="0" cellpadding="0" border="0" align="center" class="col">
                    <tbody>
                      <tr>
                        <td bgcolor="#ffffff" class="col-wrapper hero-wrapper" height="400" align="center"
                        valign="middle">This is in the middle of the hero.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if gte mso 9]>
                </v:textbox>
              </v:rect>
            <![endif]-->
          </td>
        </tr>
      </tbody>
    </table>

**Props**

- cellPadding : string `(default 0)`
- cellSpacing : string `(default 0)`
- border : number `(default 0)`
- bgColor : string
- className : string
- style : object
- width : string or number
- align : one of "left", "center", "right" `(default "center")`
- background : string
- height : number
- wrapper : shape
	- className : string
	- style : object
	- align : one of "left", "center", "right" `(default "center")`
	- valign : one of "top", "middle", "bottom" `(default "middle")`

The `wrapper` property will have all its properties applied to the inner `.hero-wrapper` element.



### ParaBlock

The `ParaBlock` is a container for `Paragraph` components.

**Example**

    var React = require("react");
    var ParaBlock = require("./ParaBlock");
    var Para = require("./Para");
    
    /*eslint no-unused-vars: 0*/
    
    module.exports = (
      <ParaBlock>
        <Para>Paragraph <strong>one</strong>.</Para>
        <Para>Paragraph two.</Para>
      </ParaBlock>
    );

**Result**

    <table cellspacing="0" cellpadding="0" border="0" class="para-block" align="left">
      <tbody>
        <tr class="para first-child">
          <td align="left" valign="top" class="para-wrapper">Paragraph <strong>one</strong>.</td>
        </tr>
        <tr class="para last-child">
          <td align="left" valign="top" class="para-wrapper">Paragraph two.</td>
        </tr>
      </tbody>
    </table>

**Props**

- cellPadding : string `(default 0)`
- cellSpacing : string `(default 0)`
- border : number `(default 0)`
- bgColor : string
- className : string
- style : object
- width : string or number
- align : one of "left", "center", "right" `(default "left")`


### Para

The `Para` component represents a paragraph of content that gives more control over vertical spacing.
These components can only be used within `ParagraphBlock` components.

**Example**

    var React = require("react");
    var ParaBlock = require("./ParaBlock");
    var Para = require("./Para");
    
    /*eslint no-unused-vars: 0*/
    
    module.exports = (
      <ParaBlock>
        <Para>Paragraph <strong>one</strong>.</Para>
        <Para wrapper={{className: "text-large"}}>Paragraph two.</Para>
      </ParaBlock>
    );

**Result**

    <table cellspacing="0" cellpadding="0" border="0" class="para-block" align="left">
      <tbody>
        <tr class="para first-child">
          <td align="left" valign="top" class="para-wrapper">Paragraph <strong>one</strong>.</td>
        </tr>
        <tr class="para last-child">
          <td class="para-wrapper text-large" align="left" valign="top">Paragraph two.</td>
        </tr>
      </tbody>
    </table>

**Props**

- className: string
	- wrapper: shape
	- bgColor: string
	- style: object
	- width: number or string
	- height: number or string
	- align: one of "left", "center", "right" `(default "left")`
	- valign: one of "top", "middle", "bottom" `(default "top")`



### Button

The `Button` component renders a bulletproof button from Campaign Monitor.

**Example**

    var React = require("react");
    var Button = require("./Button");
    
    /*eslint no-unused-vars: 0*/
    
    module.exports = (
      <Button width={250} height={40} bgColor="#ff00ff" borderColor="#ff0000" href="http://google.com/">Learn more</Button>
    );

**Result**

    <div class="button">
      <!--[if mso]>
        <v:rect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
        href="http://google.com/" style="height:40px;v-text-anchor:middle;width:250px;"
        strokecolor="#ff0000" fillcolor="#ff00ff">
          <w:anchorlock/>
          <center style="color:#ffffff;font-family:sans-serif;font-size:13px;font-weight:bold;">Learn more</center>
        </v:rect>
      <![endif]--><a href="http://google.com/" style="background-color:#ff00ff;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:13px;font-weight:bold;line-height:40px;text-align:center;text-decoration:none;width:250px;border-radius:0;-webkit-text-size-adjust:none;">Learn more</a>
    </div>

**Example**

    var React = require("react");
    var Button = require("./Button");
    
    /*eslint no-unused-vars: 0*/
    
    module.exports = (
      <Button width={250} height={40} bgColor="#ff00ff" href="http://google.com/">Learn more</Button>
    );

**Result**

    <div class="button">
      <!--[if mso]>
        <v:rect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
        href="http://google.com/" style="height:40px;v-text-anchor:middle;width:250px;"
        stroke="f" fillcolor="#ff00ff">
          <w:anchorlock/>
          <center>
          <![endif]--><a href="http://google.com/" style="background-color:#ff00ff;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:13px;font-weight:bold;line-height:40px;text-align:center;text-decoration:none;width:250px;border-radius:0;-webkit-text-size-adjust:none;">Learn more</a>
          <!--[if mso]>
          </center>
        </v:rect>
      <![endif]-->
    </div>

**Props**

- width : number `(default 200)`
- height : number `(default 40)`
- href : string `(default "http://replaceme.com/")`
- borderColor : string
- textColor : string `(default "#ffffff")`
- fontSize : number `(default 13)`
- bgColor : string `(default "#000000")`
- className : string
- borderRadius : number `(default 0)`



### List

The `List` component renders a list of items when more control over spacing is needed.

**Example**

    var React = require("react");
    var List = require("./List");
    var ListItem = require("./ListItem");
    
    /*eslint no-unused-vars: 0*/
    
    module.exports = (
      <List>
        <ListItem>Item <strong>one</strong>.</ListItem>
        <ListItem>Item two.</ListItem>
      </List>
    );

**Result**

    <table cellspacing="0" cellpadding="0" border="0" class="list" align="left">
      <tbody>
        <tr class="list-item first-child">
          <td align="left" class="list-bullet-wrapper">•</td>
          <td align="left" class="list-item-wrapper">Item <strong>one</strong>.</td>
        </tr>
        <tr class="list-item last-child">
          <td align="left" class="list-bullet-wrapper">•</td>
          <td align="left" class="list-item-wrapper">Item two.</td>
        </tr>
      </tbody>
    </table>

**Props**

- cellPadding : string `(default 0)`
- cellSpacing : string `(default 0)`
- border : number `(default 0)`
- bgColor : string
- className : string
- style : object
- width : string or number
- align : one of "left", "center", "right" `(default "left")`
- bullet : string ***[required]*** `(default "\u2022" -- the bullet character)`

The `bullet` property is passed down to each `ListItem` child so that the entire list has the same bullet value.


### ListItem

The `ListItem` component represents an item in a list that gives more control over vertical and horizontal spacing.
These components can only be used within `List` or `BulletList` components.

**Example**

    var React = require("react");
    var List = require("./List");
    var ListItem = require("./ListItem");
    
    /*eslint no-unused-vars: 0*/
    
    module.exports = (
      <List>
        <ListItem itemWrapper={{className: "text-large"}}>Item <strong>one</strong>.</ListItem>
        <ListItem>Item two.</ListItem>
      </List>
    );

**Result**

    <table cellspacing="0" cellpadding="0" border="0" class="list" align="left">
      <tbody>
        <tr class="list-item first-child">
          <td class="list-bullet-wrapper text-large" align="left">•</td>
          <td class="list-item-wrapper text-large" align="left">Item <strong>one</strong>.</td>
        </tr>
        <tr class="list-item last-child">
          <td align="left" class="list-bullet-wrapper">•</td>
          <td align="left" class="list-item-wrapper">Item two.</td>
        </tr>
      </tbody>
    </table>

**Props**

- bullet : string ***[required]*** `(default "\u2022" -- the bullet character)`
- className : string
- itemWrapper : shape
	- style : object
	- bgColor : string
	- width : number
	- height : number
	- align : one of "left", "center", "right" `(default "left")`
	- valign : one of "top", "middle", "bottom" `(default "top")`
- bulletWrapper : shape
	- style : object
	- bgColor : string
	- width : number
	- height : number
	- align : one of "left", "center", "right" `(default "left")`
	- valign : one of "top", "middle", "bottom" `(default "top")`

The `itemWrapper` property will have all its properties applied to the inner `.list-item-wrapper` element.

The `bulletWrapper` property will have all its properties applied to the inner `.list-bullet-wrapper` element

The `className` property will be applied to the `.list-item-wrapper` and the `.list-bullet-wrapper` elements.


### OrderedList

The `OrderedList` component represents an ordered list of `ListeItem` components.

**Example**

    var React = require("react");
    var OrderedList = require("./OrderedList");
    var ListItem = require("./ListItem");
    
    /*eslint no-unused-vars: 0*/
    
    module.exports = (
      <OrderedList>
        <ListItem>Item <strong>one</strong>.</ListItem>
        <ListItem>Item two.</ListItem>
      </OrderedList>
    );

**Result**

    <table cellspacing="0" cellpadding="0" border="0" class="list list-ordered"
    align="left">
      <tbody>
        <tr class="list-item first-child">
          <td align="left" class="list-bullet-wrapper">1</td>
          <td align="left" class="list-item-wrapper">Item <strong>one</strong>.</td>
        </tr>
        <tr class="list-item last-child">
          <td align="left" class="list-bullet-wrapper">2</td>
          <td align="left" class="list-item-wrapper">Item two.</td>
        </tr>
      </tbody>
    </table>

**Props**

- cellPadding : string `(default 0)`
- cellSpacing : string `(default 0)`
- border : number `(default 0)`
- bgColor : string
- className : string
- style : object
- width : string or number
- align : one of "left", "center", "right"



## MediaObject

The `MediaObject` component makes it easy to create a two column layout without a conditional `<td>` as a separator.

Note that there must exactly two `Col` child elements. It's permissible to specify the width of one, two or no `Col` children.

**Example**

    var React = require("react");
    var MediaObject = require("./MediaObject");
    var Col = require("./layout/Col");
    
    /*eslint no-unused-vars: 0*/
    
    module.exports = (
      <MediaObject width={500}>
        <Col width={300} wrapper={{className: "text-large"}}><img src="images/offer.jpg" /></Col>
        <Col align="right">This is the block of copy.</Col>
      </MediaObject>
    );

**Result**

    <table cellspacing="0" cellpadding="0" border="0" width="500" align="center"
    class="media-object">
      <tbody>
        <tr>
          <td class="media-object-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" width="290" align="left"
            class="col">
              <tbody>
                <tr>
                  <td class="col-wrapper text-large" width="290">
                    <img src="images/offer.jpg">
                  </td>
                </tr>
              </tbody>
            </table>
            <table cellspacing="0" cellpadding="0" border="0" width="190" align="right"
            class="col">
              <tbody>
                <tr>
                  <td width="190" align="left" valign="top" class="col-wrapper">This is the block of copy.</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>

**Props**

- cellPadding : string `(default 0)`
- cellSpacing : string `(default 0)`
- border : number `(default 0)`
- bgColor : string
- className : string
- style : object
- width : number ***[required]***
- align : one of "left", "center", "right" `(default "center")`
- wrapper : shape
	- className : string
	- style : object
	- bgColor : string
	- width : number or string
	- height : number or string
	- align : one of "left", "center", "right" `(default "left")`
	- valign : one of "top", "middle", "bottom" `(default "top")`

The `wrapper` property will have all its properties applied to the inner `.media-object-wrapper` element.