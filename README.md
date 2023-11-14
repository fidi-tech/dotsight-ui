# DotSight-UI: UI for managing and executing DotSight pipelines

**DotSight-UI** is a Web application for managing pipelines from [DotSight](https://github.com/fidi-tech/dotsight) developed by [FiDi](https://fidi.tech). It empowers users to create, customize and apply UI part for DotSight pipelines through convenient interface.

DotSight-UI operates under the [Apache License](./NOTICE).

## Contents
* [Quick Start](#quick-start)
* [Pages](#pages)
    * [List of pipelines](#list-of-pipelines)
    * [Pipeline creation](#pipeline-creation)
* [Widgets](#widgets)


## Quick Start
1. Ensure that you have:
    - ```node``` v16 or above,
    - ```npm``` v7 or above.
2. Instantiate [DotSight](https://github.com/fidi-tech/dotsight) application. 
3. Clone this repository.
4. Navigate to the cloned repository and ```npm ci``` to install the necessary dependencies.
5. Build the app with ```npm run build```.
6. Initiate the DotSight-UI application by executing ```npm start```.

## Pages
### List of pipelines
At the main page you can see the list of your pipelines and create new one.

### Pipeline creation
1. On the main page click Create button.
2. Select widget type what you want to build by selector from the right part of the screen (e.g. "PieChart").
3. Click ```Next``` button.
4. Select Mapper function. The available list depends on the widget type from the 2nd step (e.g. "distribution").
5. Define Mapper Id (e.g. "Example").
6. Define Mapper configuration by filling all of the required fields.
7. Click ```Next``` button.
8. Select data source from available list for your previous configuration (e.g. debank-wallet-tokens).
9. Define data source configuration by filling all of the required fields.
10. Click ```Next``` button.
11. You can see widget configuration & placeholder on the left side.
12. Configure all required params (walletId, count and colors in HEX code for the example above).
13. Click ```Update``` button.
14. You can see actual widget view and update it by updating params above.
15. Your pipeline is already saved. You can rename it on the right bottom corner and click ```Save```.

## Widgets
``src/features/widget/ui``

Widget is an UI component based on pipeline result.

Should export several parts:
* ``title`` - Name, displayed in the list of available widgets on creation page.
* ``type`` - Unique widget identificator.
* ``dataShape`` - Type of data, applicable to this widget. Depends on Mapper, which can be used for this widget.
* ``Configurator`` - Component for creation page, allows to configure final parameters for result component. Should expose getConfiguration function through useImperativeHandle.
* ``Placeholder`` - Placeholder for displaying example in lack of configuration.
* ``Widget`` - Final component UI. Based on ``pipelineId``, ``widgetId``, ``parameters`` and ``configuration``. Parameters are using for data request, configuration for display customization.
