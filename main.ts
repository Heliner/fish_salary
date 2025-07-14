// 双休日历数据（模拟，实际可从接口获取）
const weekendCalendar = new Set<Date>();

// 计算工作日天数
function getWorkingDaysInMonth(year: number, month: number, pattern: string): number {
    const date = new Date(year, month, 0);
    const daysInMonth = date.getDate();
    let workingDays = 0;

    for (let i = 1; i <= daysInMonth; i++) {
        const currentDate = new Date(year, month - 1, i);
        const dayOfWeek = currentDate.getDay();
        
        if (weekendCalendar.has(currentDate)) continue;

        switch (pattern) {
            case 'double_weekend':
                if (dayOfWeek !== 0 && dayOfWeek !== 6) workingDays++;
                break;
            case 'big_small_week':
                const weekNumber = Math.ceil(i / 7);
                if (weekNumber % 2 === 0 && (dayOfWeek === 0 || dayOfWeek === 6)) continue;
                if (weekNumber % 2 !== 0 && dayOfWeek === 6) continue;
                workingDays++;
                break;
            case '996':
                if (dayOfWeek !== 0) workingDays++; // 周日休息
                break;
        }
    }
    return workingDays;
}

// 解析工作时间
function parseWorkHours(workHoursStr: string): { start: Date; end: Date } | null {
    if (!workHoursStr.includes(' - ')) return null;
    const [startStr, endStr] = workHoursStr.split(' - ').map(s => s.trim());
    const [startHour, startMinute] = startStr.split(':').map(Number);
    const [endHour, endMinute] = endStr.split(':').map(Number);

    const now = new Date();
    const start = new Date(now);
    start.setHours(startHour, startMinute, 0, 0);
    const end = new Date(now);
    end.setHours(endHour, endMinute, 0, 0);

    return { start, end };
}

// 计算每小时工资
function calculateHourlyWage(monthlySalary: number, pattern: string, workHours: string): number {
    const now = new Date();
    const workingDays = getWorkingDaysInMonth(now.getFullYear(), now.getMonth() + 1, pattern);
    
    // Parse work hours to calculate daily working hours
    const parsedWorkHours = parseWorkHours(workHours);
    if (!parsedWorkHours) return 0;
    const dailyMs = parsedWorkHours.end.getTime() - parsedWorkHours.start.getTime();
    const dailyHours = dailyMs / (1000 * 60 * 60); // Convert milliseconds to hours
    
    const totalHours = workingDays * dailyHours;
    return monthlySalary / totalHours;
}

// 计算已工作时间（秒）
function calculateWorkedSeconds(start: Date, end: Date): number {
    const now = new Date();
    if (now < start) return 0;
    if (now > end) return (end.getTime() - start.getTime()) / 1000;
    return (now.getTime() - start.getTime()) / 1000;
}

// 添加变量跟踪上一次收益值
let lastEarnings = 0;
let updateInterval: number | undefined;

// 保存设置到本地存储
function saveSettingsToLocalStorage() {
    const workHoursStartInput = document.getElementById('workHoursStart') as HTMLInputElement;
    const workHoursEndInput = document.getElementById('workHoursEnd') as HTMLInputElement;
    const monthlySalaryInput = document.getElementById('monthlySalary') as HTMLInputElement;
    const workPatternSelect = document.getElementById('workPattern') as HTMLSelectElement;
    
    localStorage.setItem('fishTimeSettings', JSON.stringify({
        workHours: `${workHoursStartInput.value} - ${workHoursEndInput.value}`,
        monthlySalary: monthlySalaryInput.value,
        workPattern: workPatternSelect.value,
        lastSaved: new Date().toISOString()
    }));
}

// 从本地存储加载设置
function loadSettingsFromLocalStorage() {
    const savedSettings = localStorage.getItem('fishTimeSettings');
    if (savedSettings) {
        const { workHours, monthlySalary, workPattern } = JSON.parse(savedSettings);
        const workHoursStartInput = document.getElementById('workHoursStart') as HTMLInputElement;
        const workHoursEndInput = document.getElementById('workHoursEnd') as HTMLInputElement;
        
        if (workHours) {
            const [start, end] = workHours.split(' - ');
            workHoursStartInput.value = start;
            workHoursEndInput.value = end;
        }
        (document.getElementById('monthlySalary') as HTMLInputElement).value = monthlySalary;
        (document.getElementById('workPattern') as HTMLSelectElement).value = workPattern;
    }
}

// 更新收益显示
function updateEarnings() {
    const workHoursStartInput = document.getElementById('workHoursStart') as HTMLInputElement;
const workHoursEndInput = document.getElementById('workHoursEnd') as HTMLInputElement;
    const monthlySalaryInput = document.getElementById('monthlySalary') as HTMLInputElement;
    const workPatternSelect = document.getElementById('workPattern') as HTMLSelectElement;
    const earningsAmount = document.getElementById('earningsAmount') as HTMLElement;

    const workHours = `${workHoursStartInput.value} - ${workHoursEndInput.value}`;
    const monthlySalary = Number(monthlySalaryInput.value);
    const workPattern = workPatternSelect.value;

    const parsedWorkHours = parseWorkHours(`${workHoursStartInput.value} - ${workHoursEndInput.value}`);
    if (!parsedWorkHours) return;
    const hourlyWage = calculateHourlyWage(monthlySalary, workPattern, `${workHoursStartInput.value} - ${workHoursEndInput.value}`);
    const workedSeconds = calculateWorkedSeconds(parsedWorkHours.start, parsedWorkHours.end);
    const earnings = (workedSeconds / 3600) * hourlyWage;

    // 检查收益是否增加
    if (earnings > lastEarnings) {
        earningsAmount.classList.add('earnings-up');
        // 动画结束后移除类
        setTimeout(() => {
            earningsAmount.classList.remove('earnings-up');
        }, 1000);
        
        // 创建浮动动画元素
        const floatingElement = document.createElement('div');
        floatingElement.className = 'floating-money';
        floatingElement.textContent = '+💰';
        const earningsDisplay = document.querySelector('.earnings-display');
        if (earningsDisplay) {
            earningsDisplay.appendChild(floatingElement);
        } else {
            document.body.appendChild(floatingElement);
        }
        setTimeout(() => floatingElement.remove(), 1500);
    }
    
    earningsAmount.textContent = earnings.toFixed(2);
    lastEarnings = earnings;
}

// 为所有输入框添加变化事件监听
const monthlySalaryInput = document.getElementById('monthlySalary') as HTMLInputElement;
const workPatternSelect = document.getElementById('workPattern') as HTMLSelectElement;
const workHoursStartInput = document.getElementById('workHoursStart') as HTMLInputElement;
const workHoursEndInput = document.getElementById('workHoursEnd') as HTMLInputElement;

[monthlySalaryInput, workPatternSelect, workHoursStartInput, workHoursEndInput].forEach(input => {
  input.addEventListener('change', () => {
    saveSettingsToLocalStorage();
    updateEarnings();
    clearInterval(updateInterval);
    updateInterval = setInterval(updateEarnings, 10000);
  });
});// 页面加载时从本地存储加载设置
window.addEventListener('load', () => {
    loadSettingsFromLocalStorage();
updateEarnings();
updateInterval = window.setInterval(updateEarnings, 10000);
});

// 每 5 秒更新一次
setInterval(updateEarnings, 5000);