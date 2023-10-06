import TokensValueList from './tokensValueList';
import PieChart from './pieChart';
import SingleMetric from './singleMetric';

const widgets = {
  [PieChart.type]: PieChart,
  [TokensValueList.type]: TokensValueList,
  [SingleMetric.type]: SingleMetric,
};

export default widgets;
