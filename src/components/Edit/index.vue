<template>
  <div class="edit">
    <div class="btn-group">
      <div>
        <a class="button is-primary is-focused is-rounded" @click="saveAll">
          <span class="icon is-small"> <i class="fas fa-check"></i> </span> <span>保存</span>
        </a>
        <a class="button is-success is-focused is-rounded" @click="reset">
          <span class="icon is-small"><i class="fas fa-undo"></i> </span> <span>重置</span>
        </a>
      </div>
      <a class="button is-small is-danger is-focused is-rounded" @click="handleClose">
        <span class="icon is-small"> <i class="fas fa-times"></i> </span>
      </a>
    </div>
    <!-- 主题设置 Theme -->
    <b-collapse class="card" :open="false">
      <div class="card-header" slot="trigger" slot-scope="props">
        <p class="card-header-title">
          <b-icon pack="fas" icon="palette" size="is-small"> </b-icon> 主题设置
        </p>
        <a class="card-header-icon">
          <b-icon pack="fas" :icon="props.open ? 'angle-down' : 'angle-up'" size="is-small">
          </b-icon>
        </a>
      </div>
      <div class="card-content setting">
        <ul>
          <li>
            <span>主题色：</span>
            <span
              class="color-box"
              :style="getStyle('sidebar')"
              @click="setColorType('sidebar')"
            ></span>
          </li>
          <li>
            <span>技能树：</span>
            <span
              class="color-box"
              :style="getStyle('skill-from')"
              @click="setColorType('skill-from')"
            ></span>
            <i class="line" />
            <span
              class="color-box"
              :style="getStyle('skill-to')"
              @click="setColorType('skill-to')"
            ></span>
          </li>
          <li>
            <span>二级标题：</span>
            <span class="color-box" :style="getStyle('h2')" @click="setColorType('h2')"></span>
          </li>
          <li>
            <span>三级标题：</span>
            <span class="color-box" :style="getStyle('h3')" @click="setColorType('h3')"></span>
          </li>
        </ul>

        <Sketch class="sketch" v-model="pickColor" />
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="saveSetting">保存</a>
        <a class="card-footer-item" @click="back">还原</a>
      </footer>
    </b-collapse>
    <!-- 基本信息 BasicInfo -->
    <b-collapse class="card" :open="false">
      <div class="card-header" slot="trigger" slot-scope="props">
        <p class="card-header-title">
          <b-icon pack="fa" icon="address-card" size="is-small"> </b-icon> 基本信息
        </p>
        <a class="card-header-icon">
          <b-icon pack="fas" :icon="props.open ? 'angle-down' : 'angle-up'" size="is-small">
          </b-icon>
        </a>
      </div>
      <div class="card-content">
        <div v-for="(item, i) in getBasicInfoList" :key="i">
          <b-field v-if="item.label">
            <b-input
              v-model="item.infoItem.value"
              :placeholder="`${item.label}（不填则不显示该栏）`"
              :icon-pack="item.pack"
              :icon="item.icon"
              :disabled="!isEdit.basicInfo"
            >
            </b-input>
          </b-field>
          <b-field v-else>
            <b-input
              class="small-input"
              v-model="item.infoItem.type"
              :placeholder="item.type || '类型'"
              :disabled="!isEdit.basicInfo"
            >
            </b-input>
            <b-input
              class="big-input"
              v-model="item.infoItem.value"
              placeholder="自定义信息（不填则不显示该栏）"
              :disabled="!isEdit.basicInfo"
            >
            </b-input>
          </b-field>
        </div>
        <div v-if="isEdit.basicInfo" class="add-box">
          <a class="button is-primary is-outlined" @click="addItem('basicInfo')">添加</a>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="save('basicInfo')">保存</a>
        <a class="card-footer-item" @click="edit('basicInfo')">
          {{ isEdit.basicInfo ? '取消' : '编辑' }}
        </a>
      </footer>
    </b-collapse>
    <!-- 联系方式 Contact -->
    <b-collapse class="card" :open="false">
      <div class="card-header" slot="trigger" slot-scope="props">
        <p class="card-header-title">
          <b-icon pack="fas" icon="mobile-alt" size="is-small"> </b-icon> 联系方式
        </p>
        <a class="card-header-icon">
          <b-icon pack="fas" :icon="props.open ? 'angle-down' : 'angle-up'" size="is-small">
          </b-icon>
        </a>
      </div>
      <div class="card-content">
        <div v-for="(item, i) in getContactList" :key="i">
          <b-field v-if="item.label">
            <b-input
              v-model="item.infoItem.value"
              :placeholder="`${item.label}（不填则不显示该栏）`"
              :icon-pack="item.pack"
              :icon="item.icon"
              :disabled="!isEdit.contact"
            >
            </b-input>
          </b-field>
          <b-field v-else>
            <b-input
              class="small-input"
              v-model="item.infoItem.type"
              :placeholder="item.type || '类型'"
              :disabled="!isEdit.contact"
            >
            </b-input>
            <b-input
              class="big-input"
              v-model="item.infoItem.value"
              placeholder="自定义信息（不填则不显示该栏）"
              :disabled="!isEdit.contact"
            >
            </b-input>
          </b-field>
        </div>
        <div v-if="isEdit.contact" class="add-box">
          <a class="button is-primary is-outlined" @click="addItem('contact')">添加</a>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="save('contact')">保存</a>
        <a class="card-footer-item" @click="edit('contact')">
          {{ isEdit.contact ? '取消' : '编辑' }}
        </a>
      </footer>
    </b-collapse>
    <!-- 技能树 Skill -->
    <b-collapse class="card" :open.sync="isOpen.skill">
      <div class="card-header" slot="trigger">
        <p class="card-header-title">
          <b-icon pack="fab" icon="empire" size="is-small"> </b-icon> 技能树
        </p>
        <a class="card-header-icon">
          <b-icon pack="fas" :icon="isOpen.skill ? 'angle-down' : 'angle-up'" size="is-small">
          </b-icon>
        </a>
      </div>
      <div class="card-content">
        <div class="skill-item" v-for="(item, i) in skill" :key="i">
          <div v-if="item.isEdit" class="skill-name">
            <b-input
              v-model="item.type"
              size="is-small"
              placeholder="You Skill"
              type="email"
            ></b-input>
          </div>
          <div v-else class="skill-name">{{ item.type }}</div>
          <vue-slider
            v-if="isOpen.skill"
            v-model="item.value"
            tooltip="hover"
            :width="190"
            :disabled="!isEdit.skill"
            :formatter="formatter"
            :processStyle="{
              backgroundImage: '-webkit-linear-gradient(left, #ff8dde, #3498db)'
            }"
            :tooltipStyle="{
              backgroundColor: 'rgba(200, 82, 235, 0.6)',
              borderColor: 'rgba(200, 82, 235, 0.6)',
              borderWidth: 0
            }"
          ></vue-slider>
          <div class="skill-precent">{{ item.value }}%</div>
          <span v-if="isEdit.skill" @click="removeItem('skill', i)">
            <i class="fas fa-times-circle"></i>
          </span>
        </div>
        <div v-if="isEdit.skill" class="add-box">
          <a class="button is-primary is-outlined" @click="addItem('skill')">添加</a>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="save('skill')">保存</a>
        <a class="card-footer-item" @click="edit('skill')">
          {{ isEdit.skill ? '取消' : '编辑' }}
        </a>
        <a class="card-footer-item" @click="toggleHidden('skill')">
          {{ hidden.skill ? '显示' : '隐藏' }}
        </a>
      </footer>
    </b-collapse>
    <!-- 关于我 About -->
    <b-collapse class="card" :open="false">
      <div class="card-header" slot="trigger" slot-scope="props">
        <p class="card-header-title">
          <b-icon pack="fa" icon="smile-wink" size="is-small"> </b-icon> 关于我
        </p>
        <a class="card-header-icon">
          <b-icon pack="fas" :icon="props.open ? 'angle-down' : 'angle-up'" size="is-small">
          </b-icon>
        </a>
      </div>
      <div class="card-content">
        <b-input
          v-model="editAbout"
          :disabled="!isEdit.about"
          type="textarea"
          minlength="10"
          maxlength="140"
          placeholder="想了解你更多..."
        >
        </b-input>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="save('about')">保存</a>
        <a class="card-footer-item" @click="edit('about')">
          {{ isEdit.about ? '取消' : '编辑' }}
        </a>
        <a class="card-footer-item" @click="toggleHidden('about')">
          {{ hidden.about ? '显示' : '隐藏' }}
        </a>
      </footer>
    </b-collapse>
    <!-- 教育经历 Education -->
    <b-collapse class="card" :open="false">
      <div class="card-header" slot="trigger" slot-scope="props">
        <p class="card-header-title">
          <b-icon pack="fa" icon="graduation-cap" size="is-small"> </b-icon> 教育经历
        </p>
        <a class="card-header-icon">
          <b-icon pack="fas" :icon="props.open ? 'angle-down' : 'angle-up'" size="is-small">
          </b-icon>
        </a>
      </div>
      <div class="card-content education">
        <div
          v-for="(item, i) in education"
          :key="i"
          :class="i !== education.length - 1 && 'field-box'"
        >
          <a
            class="button is-small is-danger is-focused is-rounded remove"
            v-if="isEdit.education && i > 0"
            @click="removeItem('education', i)"
          >
            <span class="icon is-small"> <i class="fas fa-times"></i> </span>
          </a>
          <b-field>
            <b-input
              v-model="item.school"
              :disabled="!isEdit.education"
              placeholder="请填写毕业学校"
              icon-pack="fas"
              icon="university"
            >
            </b-input>
          </b-field>
          <b-field>
            <b-input
              v-model="item.major"
              :disabled="!isEdit.education"
              placeholder="请填写所修专业"
              icon-pack="fab"
              icon="leanpub"
            >
            </b-input>
          </b-field>
          <b-field>
            <b-input
              v-model="item.time"
              :disabled="!isEdit.education"
              placeholder="请填写在校时间"
              icon-pack="fas"
              icon="calendar-alt"
            >
            </b-input>
          </b-field>
          <b-field class="course">
            <b-taginput
              v-model="item.course"
              :disabled="!isEdit.education"
              ellipsis
              icon="book"
              icon-pack="fas"
              placeholder="添加课程"
            >
            </b-taginput>
          </b-field>
        </div>
        <div v-if="isEdit.education" class="add-box">
          <a class="button is-primary is-outlined" @click="addItem('education')">添加</a>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="save('education')">保存</a>
        <a class="card-footer-item" @click="edit('education')">
          {{ isEdit.education ? '取消' : '编辑' }}
        </a>
        <a class="card-footer-item" @click="toggleHidden('education')">
          {{ hidden.education ? '显示' : '隐藏' }}
        </a>
      </footer>
    </b-collapse>
    <!-- 个人项目 Project -->
    <b-collapse class="card" :open="false">
      <div class="card-header" slot="trigger" slot-scope="props">
        <p class="card-header-title">
          <b-icon pack="fas" icon="laptop-code" size="is-small"> </b-icon> 个人项目
        </p>
        <a class="card-header-icon">
          <b-icon pack="fas" :icon="props.open ? 'angle-down' : 'angle-up'" size="is-small">
          </b-icon>
        </a>
      </div>
      <div class="card-content project">
        <div v-for="(item, i) in project" :key="i" :class="i !== project.length - 1 && 'field-box'">
          <a
            class="button is-small is-danger is-focused is-rounded remove"
            v-if="isEdit.project && i > 0"
            @click="removeItem('project', i)"
          >
            <span class="icon is-small"> <i class="fas fa-times"></i> </span>
          </a>
          <b-field>
            <b-input
              v-model="item.name"
              :disabled="!isEdit.project"
              placeholder="请填写项目名称"
              icon-pack="fas"
              icon="code"
            >
            </b-input>
          </b-field>
          <b-field>
            <b-input
              v-model="item.description"
              :disabled="!isEdit.project"
              placeholder="请填写项目简介"
              icon-pack="fas"
              icon="bookmark"
            >
            </b-input>
          </b-field>
          <b-field>
            <b-input
              v-model="item.sourceCode"
              :disabled="!isEdit.project"
              placeholder="请填写项目源码地址（如果有的话）"
              icon-pack="fas"
              icon="code-branch"
            >
            </b-input>
          </b-field>
          <b-field>
            <b-input
              v-model="item.link"
              :disabled="!isEdit.project"
              placeholder="请填写在线预览地址（如果有的话）"
              icon-pack="fab"
              icon="codepen"
            >
            </b-input>
          </b-field>
          <b-field>
            <b-input
              :disabled="!isEdit.project"
              v-model="item.summary"
              type="textarea"
              minlength="10"
              maxlength="140"
              placeholder="项目详细介绍..."
            >
            </b-input>
          </b-field>
          <b-field>
            <b-input
              :disabled="!isEdit.project"
              :value="item.previewImage.join(',')"
              @input="val => inputImg(val, item)"
              type="textarea"
              minlength="10"
              maxlength="300"
              placeholder="图片预览...（以逗号分隔）"
            >
            </b-input>
          </b-field>
        </div>
        <div v-if="isEdit.project" class="add-box">
          <a class="button is-primary is-outlined" @click="addItem('project')">添加</a>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="save('project')">保存</a>
        <a class="card-footer-item" @click="edit('project')">
          {{ isEdit.project ? '取消' : '编辑' }}
        </a>
        <a class="card-footer-item" @click="toggleHidden('project')">
          {{ hidden.project ? '显示' : '隐藏' }}
        </a>
      </footer>
    </b-collapse>
    <!-- 工作经历 Experience -->
    <b-collapse class="card" :open="false">
      <div class="card-header" slot="trigger" slot-scope="props">
        <p class="card-header-title">
          <b-icon pack="fas" icon="briefcase" size="is-small"> </b-icon> 工作经历
        </p>
        <a class="card-header-icon">
          <b-icon pack="fas" :icon="props.open ? 'angle-down' : 'angle-up'" size="is-small">
          </b-icon>
        </a>
      </div>
      <div class="card-content experience">
        <div
          v-for="(company, i) in experience"
          :key="i"
          :class="['company-box', i === experience.length - 1 && 'last']"
        >
          <a
            class="button is-small is-danger is-focused is-rounded remove"
            v-if="isEdit.experience && i > 0"
            @click="removeItem('experience', i)"
          >
            <span class="icon is-small"> <i class="fas fa-times"></i> </span>
          </a>
          <b-field>
            <b-input
              v-model="company.companyLogo"
              :disabled="!isEdit.experience"
              placeholder="请填写公司 Logo （如果有的话）"
              icon-pack="fas"
              icon="image"
            >
            </b-input>
          </b-field>
          <b-field>
            <b-input
              v-model="company.companyName"
              :disabled="!isEdit.experience"
              placeholder="请填写公司名称"
              icon-pack="fas"
              icon="building"
            >
            </b-input>
          </b-field>
          <b-field>
            <b-input
              v-model="company.time"
              :disabled="!isEdit.experience"
              placeholder="请填写在职时间"
              icon-pack="fas"
              icon="calendar-alt"
            >
            </b-input>
          </b-field>
          <div v-for="(item, j) in company.project" :key="j">
            <b-collapse class="card company-project-card" :open="false">
              <div slot="trigger" slot-scope="props1" class="card-header">
                <p class="card-header-title">{{ item.name }}</p>
                <a
                  class="button is-light is-small is-focused is-rounded remove remove-project"
                  v-if="isEdit.experience"
                  @click="removeProject(i, j)"
                >
                  <span class="icon is-small"> <i class="fas fa-minus"></i> </span>
                </a>
                <a class="card-header-icon">
                  <b-icon
                    pack="fas"
                    :icon="props1.open ? 'angle-down' : 'angle-up'"
                    size="is-small"
                  >
                  </b-icon>
                </a>
              </div>
              <div class="card-content">
                <div class="content">
                  <b-field>
                    <b-input
                      v-model="item.name"
                      :disabled="!isEdit.experience"
                      placeholder="请填写项目名称"
                      icon-pack="fas"
                      icon="code"
                    >
                    </b-input>
                  </b-field>
                  <b-field>
                    <b-input
                      v-model="item.description"
                      :disabled="!isEdit.experience"
                      placeholder="请填写项目简介"
                      icon-pack="fas"
                      icon="bookmark"
                    >
                    </b-input>
                  </b-field>
                  <b-field>
                    <b-input
                      v-model="item.link"
                      :disabled="!isEdit.experience"
                      placeholder="请填写在线预览地址（如果有的话）"
                      icon-pack="fas"
                      icon="laptop"
                    >
                    </b-input>
                  </b-field>
                  <b-field>
                    <b-input
                      :disabled="!isEdit.experience"
                      v-model="item.summary"
                      type="textarea"
                      minlength="10"
                      maxlength="140"
                      placeholder="项目详细介绍..."
                    >
                    </b-input>
                  </b-field>
                  <b-field>
                    <b-input
                      :disabled="!isEdit.experience"
                      :value="item.previewImage.join(',')"
                      @input="val => inputImg(val, item)"
                      type="textarea"
                      minlength="10"
                      maxlength="300"
                      placeholder="图片预览...（以逗号分隔）"
                    >
                    </b-input>
                  </b-field>
                </div>
              </div>
            </b-collapse>
          </div>
          <div v-if="isEdit.experience" class="add-box">
            <a class="button is-success is-outlined" @click="addProject(i, j)">添加在职项目</a>
          </div>
        </div>
        <div v-if="isEdit.experience" class="add-box">
          <a class="button is-primary is-outlined" @click="addItem('experience')">添加工作经历</a>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="save('experience')">保存</a>
        <a class="card-footer-item" @click="edit('experience')">
          {{ isEdit.experience ? '取消' : '编辑' }}
        </a>
        <a class="card-footer-item" @click="toggleHidden('experience')">
          {{ hidden.experience ? '显示' : '隐藏' }}
        </a>
      </footer>
    </b-collapse>
  </div>
</template>
<script>
import vueSlider from 'vue-slider-component'
import { Sketch } from 'vue-color'
import Color from 'color'
import { deepCopy } from '../../utils/tool'
export default {
  name: 'Edit',
  components: {
    vueSlider,
    Sketch
  },
  props: {
    map: {
      type: Object
    },
    hidden: {
      type: Object
    },
    color: {
      type: Object
    },
    basicInfo: {
      type: Array
    },
    contact: {
      type: Array
    },
    skill: {
      type: Array
    },
    about: {
      type: String
    },
    education: {
      type: Array
    },
    project: {
      type: Array
    },
    experience: {
      type: Array
    }
  },
  data() {
    return {
      isEdit: {
        basicInfo: false,
        contact: false,
        skill: false,
        about: false,
        education: false,
        project: false,
        experience: false
      },
      isOpen: {
        skill: false
      },
      colorType: 'sidebar',
      pickColor: {
        hex: '#8d9cd2',
        hsl: { h: 227, s: 0.43, l: 0.69, a: 1 },
        hsv: { h: 227, s: 0.33, v: 0.82, a: 1 },
        rgba: { r: 141, g: 156, b: 210, a: 1 },
        a: 1
      },
      // 快照
      snapshot: {},
      editAbout: ''
    }
  },
  computed: {
    getBasicInfoList() {
      const link = this.map.basicInfo
      return this.basicInfo.map(o => {
        const linkItem = link[o.type] || {}
        return {
          label: linkItem.label,
          infoItem: o,
          icon: linkItem.icon,
          pack: linkItem.pack || 'fas'
        }
      })
    },
    getContactList() {
      const link = this.map.contact
      return this.contact.map(o => {
        const linkItem = link[o.type] || {}
        return {
          label: linkItem.label,
          infoItem: o,
          icon: linkItem.icon,
          pack: linkItem.pack || 'fas'
        }
      })
    }
  },
  watch: {
    pickColor(val) {
      if (!this.colorType) return
      let color = val.rgba
      let alpha = color.a
      delete color.a
      color.alpha = alpha
      const newColor = Color(color).string()
      this.$emit('setColor', { type: this.colorType, color: newColor })
    },
    editAbout(val) {
      this.$emit('setAbout', val)
    }
  },
  created() {
    const props = ['basicInfo', 'contact', 'skill', 'about', 'education', 'project', 'experience']
    props.forEach(k => this.takeSnapShot(k))
    this.editAbout = this.about
  },
  methods: {
    // 保存快照
    takeSnapShot(type) {
      this.snapshot[type] = deepCopy(this[type])
    },
    // 关闭编辑菜单
    handleClose() {
      this.$emit('handleCloseMenu')
    },
    // 重置信息
    reset() {
      this.dialog({
        message: '是否将所有信息重置为 <b>初始状态</b> 喵？若如此则将清空已保存信息。',
        callback: () => {
          this.$emit('reset')
          this.$toast.open({
            message: '重置成功!',
            type: 'is-success'
          })
        }
      })
    },
    // 保存所有信息
    saveAll() {
      this.$emit('saveAll')
    },
    // 保存
    save(type) {
      this.$emit('save', { type })
      this.isEdit[type] = false
      this.snackbarMsg()
    },
    // 保存设置
    saveSetting() {
      this.$emit('saveSetting')
      this.snackbarMsg()
    },
    // 还原
    back() {
      this.dialog({
        message: '是否将所有主题配置还原为 <b>初始状态</b> 喵？若如此则将清空已保存设置。',
        callback: () => {
          this.$emit('back')
          this.$toast.open({
            message: '还原成功!',
            type: 'is-success'
          })
        }
      })
    },
    // 编辑
    edit(type) {
      this.isEdit[type] = !this.isEdit[type]
      if (!this.isEdit[type]) {
        // 还原上一次快照
        this.$emit('save', { type, data: this.snapshot[type] })
        if (type === 'about') {
          this.editAbout = this.snapshot.about
        }
      } else {
        this.takeSnapShot(type)
      }
    },
    // 显示/隐藏
    toggleHidden(type) {
      this.hidden[type] = !this.hidden[type]
      if (type !== 'basicInfo' && type !== 'contact') {
        this.$emit('saveSetting')
      }
    },
    // 移除项目
    removeItem(type, i) {
      this[type].splice(i, 1)
    },
    // 添加项目
    addItem(type) {
      let template
      switch (type) {
        case 'basicInfo':
          template = {
            type: '',
            value: ''
          }
          break
        case 'contact':
          template = {
            type: '',
            value: ''
          }
          break
        case 'skill':
          template = {
            name: '卖萌技',
            value: 60,
            isEdit: true
          }
          break
        case 'education':
          template = {
            school: '',
            major: '',
            time: '',
            course: []
          }
          break
        case 'project':
          template = {
            name: '',
            description: '',
            link: '',
            summary: '',
            previewImage: []
          }
          break
        case 'experience':
          template = {
            companyLogo: '',
            companyName: '',
            time: '',
            role: '',
            project: []
          }
      }
      this[type].push(template)
    },
    // 添加工作经历的项目
    addProject(i) {
      this.experience[i].project.push({
        name: '',
        description: '',
        link: '',
        summary: '',
        previewImage: []
      })
    },
    // 移除工作经历的项目
    removeProject(i, j) {
      this.experience[i].project.splice(j, 1)
    },
    // 添加预览图
    inputImg(val, item) {
      if (val !== item.previewImage.join(',')) {
        item.previewImage = val.split(',')
      }
    },
    // 技能进度格式化
    formatter(value) {
      let tip = ''
      if (value < 20) tip = '萌新'
      else if (value >= 20 && value < 40) tip = '了解'
      else if (value >= 40 && value < 60) tip = '入门'
      else if (value >= 60 && value < 80) tip = '熟悉'
      else if (value >= 80) tip = '精通 '
      return tip
    },
    // 消息提示
    snackbarMsg() {
      this.$snackbar.open({
        duration: 2000,
        message: '保存成功！o(*￣▽￣*)ブ',
        type: 'is-success',
        position: 'is-bottom-left',
        actionText: 'OK',
        queue: false
      })
    },
    // 确认弹窗
    dialog({ message, callback }) {
      this.$dialog.confirm({
        title: '提示',
        message,
        cancelText: '取消',
        confirmText: '确定',
        type: 'is-danger',
        iconPack: 'fas',
        icon: 'exclamation-circle',
        hasIcon: true,
        onConfirm: callback
      })
    },
    // 当前取色类型
    setColorType(type) {
      this.colorType = type
    },
    // 获取深色
    getDarken(color) {
      return Color(color).darken(0.2)
    },
    // 取色框yanse
    getStyle(type) {
      let style
      switch (type) {
        case 'sidebar':
          style = { backgroundColor: this.color.sidebar }
          break
        case 'skill-from':
          style = { backgroundColor: this.color.skill.from }
          break
        case 'skill-to':
          style = { backgroundColor: this.color.skill.to }
          break
        case 'h2':
          style = { backgroundColor: this.color.h2 }
          break
        case 'h3':
          style = { backgroundColor: this.color.h3 }
          break
      }
      if (type === this.colorType) {
        style.boxShadow = `0 0 0 3px ${this.getDarken(style.backgroundColor)}`
      }
      return style
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './index.less';
</style>
