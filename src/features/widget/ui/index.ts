import TokensValueList from './tokensValueList';
import PieChart from './pieChart';
import SingleMetric from './singleMetric';
import LineChart from './lineChart';

const widgets = {
  [PieChart.type]: PieChart,
  [TokensValueList.type]: TokensValueList,
  [SingleMetric.type]: SingleMetric,
  [LineChart.type]: LineChart,
};

export default widgets;
