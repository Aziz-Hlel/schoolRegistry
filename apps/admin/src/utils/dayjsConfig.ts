import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
dayjs.extend(localizedFormat);
dayjs.locale('ar');

export default dayjs;
